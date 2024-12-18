import Department from "../models/Department.js";
import { validationResult, body } from 'express-validator'; // Importing body for validation

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "get departments server error" });
  }
};

const addDepartment = async (req, res) => {
  // Validation
  await body('dep_name').notEmpty().withMessage('Department name is required').run(req);
  await body('description').notEmpty().withMessage('Description is required').run(req);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    console.log(`Department added: ${newDep._id}`); // Log success
    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(id, { dep_name, description }, { new: true });
    if (!updateDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department: updateDep });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete department with ID: ${id}`); // Debug log for deletion attempt
        const deletedDep = await Department.findByIdAndDelete(id);

        if (!deletedDep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        console.log(`Department with ID: ${id} has been deleted`); // Log the success
        return res.status(200).json({ success: true, department: deletedDep });
    } catch (error) {
        console.error(error); // Log any server-side errors
        return res.status(500).json({ success: false, error: "delete department server error" });
    }
};


export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
