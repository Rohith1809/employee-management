import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 }, // Fixed name and added default
  deductions: { type: Number, default: 0 }, // Added default
  netSalary: { type: Number, default: 0 }, // Added default
  payDate: { type: Date, required: true }, // Fixed typo
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
