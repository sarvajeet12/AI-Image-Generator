export const applyGenerationCost = async (user) => {
  // Each user has 5 free generations, then 1 point per generation
  if (user.freeUsed < 5) {
    user.freeUsed += 1;
    await user.save();
    return { costType: 'free', user };
  }
  if (user.points > 0) {
    user.points -= 1;
    await user.save();
    return { costType: 'points', user };
  }
  const err = new Error('Insufficient points. Please purchase credits.');
  err.status = 402;
  throw err;
};
