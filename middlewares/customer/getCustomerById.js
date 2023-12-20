async function getCustomerId(req, res, next) {
  const { customerId } = req.params;

  try {
    if (!customerId) {
      console.log("empty");
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const customer = await models.customer.findOne({
      where: { user_id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    req.customer = customer;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = getCustomerId;
