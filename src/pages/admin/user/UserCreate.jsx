import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GENDERS } from "../../../../../backend_ticketgo/src/config/constant.js";

export default function UserCreate() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    roleId: "",
    avatar: null,
  });
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [roles, setRoles] = useState([]);
  const [genders] = useState(Object.values(GENDERS));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("/api/users/roles");
        setRoles(res.data.roles);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      setFormData({ ...formData, avatar: files[0] });
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData({ ...formData, avatar: file });
        setAvatarPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("birthDate", formData.birthDate);
      form.append("gender", formData.gender);
      form.append("roleId", formData.roleId);
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }

      await axios.post("/api/users", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Tạo người dùng thành công!");
      navigate("/admin/users");
    } catch (err) {
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          if (error.path === "fullName") backendErrors.fullName = error.message;
          else if (error.path === "email") backendErrors.email = error.message;
          else if (error.path === "phone") backendErrors.phone = error.message;
          else if (error.path === "birthDate")
            backendErrors.birthDate = error.message;
          else if (error.path === "gender")
            backendErrors.gender = error.message;
          else if (error.path === "roleId")
            backendErrors.roleId = error.message;
          else if (error.path === "avatar")
            backendErrors.avatar = error.message;
        });
        setErrors(backendErrors);
      } else {
        alert("Lỗi: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Manage Users</h1>
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link to="/admin" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <span className="ms-2">/</span>
          </li>
          <li>
            <Link to="/admin/users" className="text-blue-600 hover:underline">
              Users
            </Link>
            <span className="ms-2">/</span>
          </li>
          <li className="text-gray-700">Create A User</li>
        </ol>
      </nav>

      <h5 className="text-lg font-semibold mb-6 max-w-lg mx-auto">
        Create A User
      </h5>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Full Name:
            {errors.fullName && (
              <span className="text-red-500 text-xs mt-1">
                {" "}
                * {errors.fullName}
              </span>
            )}
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                 errors.fullName ? "border-red-500" : "border-gray-300"
               }`}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email:
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {" "}
                * {errors.email}
              </span>
            )}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone:
            {errors.phone && (
              <span className="text-red-500 text-xs mt-1">
                {" "}
                * {errors.phone}
              </span>
            )}
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                 errors.phone ? "border-red-500" : "border-gray-300"
               }`}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Gender:
              {errors.gender && (
                <span className="text-red-500 text-xs mt-1">
                  {" "}
                  * {errors.gender}
                </span>
              )}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">-- Select gender --</option>
              {Array.isArray(genders) &&
                genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Birth Date:
              {errors.birthDate && (
                <span className="text-red-500 text-xs mt-1">
                  {" "}
                  * {errors.birthDate}
                </span>
              )}
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                 errors.birthDate ? "border-red-500" : "border-gray-300"
               }`}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Role:
            {errors.roleId && (
              <span className="text-red-500 text-xs mt-1">
                {" "}
                * {errors.roleId}
              </span>
            )}
          </label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              errors.roleId ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">-- Chọn vai trò --</option>
            {Array.isArray(roles) &&
              roles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Avatar:
            {errors.avatar && (
              <span className="text-red-500 text-xs mt-1">
                {" "}
                * {errors.avatar}
              </span>
            )}
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label
              htmlFor="avatar"
              className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition ${
                errors.avatar ? "border-red-500" : "border-gray-300"
              }`}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9H7z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">Thêm ảnh đại diện</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Ảnh tối thiểu <span className="font-bold">100×100</span>{" "}
                    (.PNG, .JPG, .JPEG)
                  </p>
                </div>
              )}
            </label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 shadow-lg shadow-gray-400 w-full sticky bottom-8 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer flex-1"
        >
          Create
        </button>
      </form>
    </div>
  );
}
