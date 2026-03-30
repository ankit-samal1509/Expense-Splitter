import * as service from '../services/groupService.js'

export const getAllGroups = async (req, res, next) => {
  try {
    const userId = req.userId
    const groups = await service.getAllGroups(userId)
    res.json(groups)
  } catch (err) { next(err) }
}

export const getGroupById = async (req, res, next) => {
  try {
    const group = await service.getGroupById(req.params.id)
    res.json(group)
  } catch (err) { next(err) }
}

export const createGroup = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "req.body is missing" });
  if (!req.userId) return res.status(401).json({ error: "User not authenticated" });

  const { name, description, currency, members } = req.body;
  const userId = req.userId;
  try {
    const group = await service.createGroup({ name, description, currency, members }, userId);
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const deleteGroup = async (req, res, next) => {
  try {
    await service.deleteGroup(req.params.id)
    res.json({ message: 'Group deleted successfully' })
  } catch (err) { next(err) }
}