import Sweet from "../models/Sweet.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    if (sweet.quantity <= 0)
      return res.status(400).json({ error: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();
    res.json({ message: "Sweet purchased", sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    sweet.quantity += Number(quantity);
    await sweet.save();
    res.json({ message: "Sweet restocked", sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
