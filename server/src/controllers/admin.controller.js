import User from '../models/User.js';
import Payment from '../models/Payment.js';
import Generation from '../models/Generation.js';
import ExcelJS from 'exceljs';

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, 'email name role loginType freeUsed points createdAt').sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

export const listPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({}, 'userId orderId paymentId status amount pointsPurchased createdAt')
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ payments });
  } catch (err) {
    next(err);
  }
};

export const stats = async (req, res, next) => {
  try {
    const [totalUsers, totalImages, paidPayments] = await Promise.all([
      User.countDocuments(),
      Generation.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);
    const totalRevenueINR = ((paidPayments?.[0]?.total || 0) / 100).toFixed(2);
    res.json({ totalUsers, totalImages, totalRevenueINR: Number(totalRevenueINR) });
  } catch (err) {
    next(err);
  }
};

export const adjustUserPoints = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { delta } = req.body;
    delta = parseInt(delta, 10);
    if (!Number.isFinite(delta) || delta === 0) {
      return res.status(400).json({ message: 'delta must be a non-zero integer' });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.points = Math.max(0, (user.points || 0) + delta);
    await user.save();
    res.json({ id: user._id, points: user.points });
  } catch (err) {
    next(err);
  }
};

export const exportCsv = async (req, res, next) => {
  try {
    // Fetch datasets
    const users = await User.find({}, 'email name role loginType freeUsed points createdAt').sort({ createdAt: -1 }).lean();
    const gens = await Generation.find({}, 'userId prompt imageUrl createdAt saved').sort({ createdAt: -1 }).lean();
    const payments = await Payment.find({}, 'userId orderId paymentId status amount pointsPurchased createdAt').populate('userId', 'email').sort({ createdAt: -1 }).lean();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'ImagoAI';
    workbook.created = new Date();

    // Users sheet
    const uSheet = workbook.addWorksheet('Users');
    uSheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Role', key: 'role', width: 15 },
      { header: 'LoginType', key: 'loginType', width: 15 },
      { header: 'FreeUsed', key: 'freeUsed', width: 10 },
      { header: 'Points', key: 'points', width: 10 },
      { header: 'CreatedAt', key: 'createdAt', width: 25 },
    ];
    users.forEach((u) => {
      uSheet.addRow({
        name: u.name || '',
        email: u.email || '',
        role: u.role || '',
        loginType: u.loginType || '',
        freeUsed: u.freeUsed || 0,
        points: u.points || 0,
        createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : '',
      });
    });

    // Generations sheet
    const gSheet = workbook.addWorksheet('Generations');
    gSheet.columns = [
      { header: 'UserId', key: 'userId', width: 24 },
      { header: 'Prompt', key: 'prompt', width: 60 },
      { header: 'ImageUrl', key: 'imageUrl', width: 60 },
      { header: 'Saved', key: 'saved', width: 10 },
      { header: 'CreatedAt', key: 'createdAt', width: 25 },
    ];
    gens.forEach((g) => {
      gSheet.addRow({
        userId: g.userId ? String(g.userId) : '',
        prompt: g.prompt || '',
        imageUrl: g.imageUrl || '',
        saved: !!g.saved,
        createdAt: g.createdAt ? new Date(g.createdAt).toISOString() : '',
      });
    });

    // Payments sheet
    const pSheet = workbook.addWorksheet('Payments');
    pSheet.columns = [
      { header: 'OrderId', key: 'orderId', width: 25 },
      { header: 'PaymentId', key: 'paymentId', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Amount(INR)', key: 'amount', width: 12 },
      { header: 'PointsPurchased', key: 'pointsPurchased', width: 12 },
      { header: 'CreatedAt', key: 'createdAt', width: 25 },
    ];
    payments.forEach((p) => {
      pSheet.addRow({
        orderId: p.orderId || '',
        paymentId: p.paymentId || '',
        email: p.userId?.email || '',
        status: p.status || '',
        amount: (p.amount || 0) / 100,
        pointsPurchased: p.pointsPurchased || 0,
        createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : '',
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="imago-admin-export.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};
