import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from '../models/Department.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "public/uploads";
        cb(null, dir); // Ensure "public/uploads" exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and JPEG are allowed."));
        }
    },
});

// Controller functions
const addEmployee = async (req, res) => {
    try {
        // Debugging logs
        console.log("Incoming request body:", req.body);
        console.log("Uploaded file details:", req.file);

        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        if (!password) {
            console.error("Password is missing or empty!");
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.error("Error in addEmployee:", error.message);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", { password: 0 })
            .populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error in getEmployees:", error.message);
        return res.status(500).json({ success: false, error: "Server error in retrieving employees" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        let employee;
        employee = await Employee.findById({_id:id})
            .populate("userId", { password: 0 })
            .populate("department");
            if(!employee){
             employee =   await Employee.findOne({userId:id})
            .populate("userId", { password: 0 })
            .populate("department");

            }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error in getEmployee:", error.message);
        return res.status(500).json({ success: false, error: "Server error in retrieving employee" });
    }
};


const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
            
        } = req.body;
        const employee = await Employee.findById({_id: id})
        if(!employee){
            return res.status(404).json({ success: false, error: "employee not found" });
        }

        const user = await User.findById({_id: employee.userId})

        if(!user){
            return res.status(404).json({ success: false, error: "user not found" });
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id},{
            maritalStatus,
            designation,salary, department
        })

        if(!updateEmployee || !updateUser){
            return res.status(404).json({ success: false, error: "document not found" });
        }

        return res.status(200).json({success: true, message: "employee update"})

    }catch(error){
        return res.status(500).json({ success: false, error: "Update employees Server error" });
    }



}


const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;

    try {
        const employees = await Employee.find({department:id})
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employeebyDepId Server error" });
    }

}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };
