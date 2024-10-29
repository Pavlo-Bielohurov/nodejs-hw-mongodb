export const notFaundHandler = (req, res) => {
  res.status(404).json({
    message: `${req.url}Not found`,
  });
};
