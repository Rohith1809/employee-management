import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body; // Fixed req.body()

    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error adding salary:", error.message); // Added error logging
    return res.status(500).json({ success: false, error: "Salary add server error" });
  }
};

const getSalary = async (req, res) => {
    try{
        const {id} = req.params;
        let salary
        salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        if(!salary ||salary.length<1){
          const employee = await Employee.findOne({userId: id})
          salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')

        }
        return res.status(200).json({ success: true, salary });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: "Salary get server error" });
      }
}

export { addSalary , getSalary};
