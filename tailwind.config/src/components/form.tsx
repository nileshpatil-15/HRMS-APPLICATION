
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
interface FormData {
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  personalEmail: string;
  officialEmail: string;
  linkedinProfile: string;
  SkypeProfile: string;
  employeePrimaryContact: string;
  employeeSecondaryContact: string;
  address: string;
  files: string;
  gender: string;
  maritualStatus: string;
  city: string;
  state: string;
  country: string;
  Zipcode: string;
}

// import { Datepicker, Input, initTE } from "tw-elements";

// initTE({ Datepicker, Input });
export default function EmployeeDetailForm() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  // const call = (e) => {
  //   console.log(e.target.name);
  // };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4"></div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  @
                </span>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  Password:
                </span>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                      message:
                        "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character.",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  First Name
                </span>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "first name is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="First Name"
                      aria-label="First Name"
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  Middle Name
                </span>
                <Controller
                  name="middleName"
                  control={control}
                  rules={{ required: "middle name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Middle Name"
                      aria-label="Middle Name"
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.middleName && (
                <p className="error text-red-600">
                  {errors.middleName.message}
                </p> 
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  Last Name
                </span>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "last name is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Last Name"
                      aria-label="Last Name"
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.lastName && (
                <p className="error text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative mb-4 flex flex-wrap items-stretch">
                <Controller
                  name="personalEmail"
                  control={control}
                  rules={{
                    required: " Personal email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid personal email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-l border border-solid
                                 border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6]
                                  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary
                                   focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none
                                    dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Personal Email Address"
                      aria-label="Personal Email Address"
                      aria-describedby="basic-addon2"
                    />
                  )}
                />

                <span
                  className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid
                                 border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700
                                  dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="basic-addon2"
                >
                  @example.com
                </span>
              </div>
              {errors.personalEmail && (
                <p className="error text-red-600">
                  {errors.personalEmail.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative mb-4 flex flex-wrap items-stretch">
                <Controller
                  name="officialEmail"
                  control={control}
                  rules={{
                    required: "official email  is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid official email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-l border border-solid
                                 border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6]
                                  text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary
                                   focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none
                                    dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Official Email Address"
                      aria-label="Official Email Address"
                      aria-describedby="basic-addon2"
                    />
                  )}
                />

                <span
                  className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid
                                 border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700
                                  dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="basic-addon2"
                >
                  @example.com
                </span>
              </div>
              {errors.officialEmail && (
                <p className="error text-red-600">
                  {errors.officialEmail.message}
                </p>
              )}
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative mb-4 flex flex-wrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="basic-addon3"
                >
                  LinkedIn:
                </span>
                <Controller
                  name="linkedinProfile"
                  control={control}
                  rules={{
                    required: "URL is required",
                    pattern: {
                      value: /https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+/,
                      message: "Please provide valid URL.",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  )}
                />
              </div>
              {errors.linkedinProfile && (
                <p className="error text-red-600">
                  {errors.linkedinProfile.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative mb-4 flex flex-wrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="basic-addon3"
                >
                  Skype Id:
                </span>
                <Controller
                  name="SkypeProfile"
                  control={control}
                  rules={{
                    required: "Skype profile is required",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  )}
                />
              </div>
              {errors.SkypeProfile && (
                <p className="error text-red-600">
                  {errors.SkypeProfile.message}
                </p>
              )}
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  Primary Contact Number
                </span>
                <Controller
                  name="employeePrimaryContact"
                  control={control}
                  rules={{
                    required: "Primary contact is required",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "Please provide valid contact",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder=""
                      aria-label=""
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.employeePrimaryContact && (
                <p className="error text-red-600">
                  {errors.employeePrimaryContact.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <span
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  id="addon-wrapping"
                >
                  Secondary Contact Number
                </span>
                <Controller
                  name="employeeSecondaryContact"
                  control={control}
                  rules={{
                    required: "Secondary contact is required",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "Please provide valid contact.",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder=""
                      aria-label=""
                      aria-describedby="addon-wrapping"
                    />
                  )}
                />
              </div>
              {errors.employeeSecondaryContact && (
                <p className="error text-red-600">
                  {errors.employeeSecondaryContact.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4"></div>
          </div>

          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <div className="relative flex flex-wrap items-stretch">
                  <label
                    className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    htmlFor="inputGroupSelect01"
                  >
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{
                      required: "Please choose field",
                    }}
                    render={({ field }) => (
                      <select
                        {...field}
              
                        className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="inputGroupSelect01"
                      >
                        <option value="">Choose from options</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    )}
                  />
                </div>
                <p className="text-red-600">
                  {errors.gender && errors.gender.message}
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <div className="relative flex flex-wrap items-stretch">
                  <label
                    className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    htmlFor="inputGroupSelect01"
                  >
                    Marital Status
                  </label>
                  <Controller
                    name="maritualStatus"
                    control={control}
                    rules={{
                      required: "Please choose field",
                    }}
                    render={({ field }) => (
                      <select
                        {...field}
                      
                        className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="inputGroupSelect01"
                      >
                        <option value="">Choose from options</option>
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                      </select>
                    )}
                  />
                </div>
                <p className="text-red-500">
                  {errors.maritualStatus && errors.maritualStatus.message}
                </p>
              </div>
            </div>
          </div>
          <div className="m-4 mb-6">
            <div className="relative mb-3 flex flex-nowrap items-stretch">
              <span
                className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                id="addon-wrapping"
              >
                Address
              </span>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Address is required",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Address"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                )}
              />
            </div>
            {errors.address && (
              <p className="error text-red-600">{errors.address.message}</p>
            )}
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative flex flex-wrap items-stretch">
                <label
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  htmlFor="inputGroupSelect01"
                >
                  City
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <select
                     
                      {...field}
                      className="form-select relative  m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary "
                      id="inputGroupSelect01"
                    >
                      <option value="">Choose...</option>
                      <option value="Kolhapur">Kolhapur</option>
                      <option value="Pune">Pune</option>
                      <option value="mumbai">Mumbai</option>
                    </select>
                  )}
                  rules={{
                    required: "please choose from options",
                  }}
                />
              </div>
              <p className="text-red-600">
                {errors.city && errors.city.message}
              </p>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative flex flex-wrap items-stretch">
                <label
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  htmlFor="inputGroupSelect01"
                >
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  rules={{
                    required: "please choose from options",
                  }}
                  render={({ field }) => (
                    <select
                     
                      {...field}
                      className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      id="inputGroupSelect01"
                    >
                      <option selected>Choose...</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnatak</option>
                    </select>
                  )}
                />
              </div>
              <p className="text-red-600">
                {errors.state && errors.state.message}
              </p>
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative flex flex-wrap items-stretch">
                <label
                  className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  htmlFor="inputGroupSelect01"
                >
                  Country
                </label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "please choose from options" }}
                  render={({ field }) => (
                    <select
                      {...field}
                
                      className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      id="inputGroupSelect01"
                    >
                      <option value="">Choose...</option>
                      <option value="India">India</option>
                      <option value="Japan">Japan</option>
                      <option value="USA">USA</option>
                      <option value="Germany">Germany</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                    </select>
                  )}
                />
              </div>
              {errors.country && (
                <p className="text-red-600">{errors.country?.message}</p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="relative mb-3 flex flex-nowrap items-stretch">
                <Controller
                  control={control}
                  name="Zipcode"
                  rules={{
                    required: "Zip code required",
                    pattern: {
                      value: /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/gm,

                      message: "Please provide zip code.",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Zip/Postal code"
                    />
                  )}
                />
              </div>
              {errors.Zipcode && (
                <p className="text-red-600"> {errors.Zipcode.message}</p>
              )}
            </div>
          </div>
          <div className="m-4 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <div className="m-4">
                <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Multiple files input example
                </label>
                <Controller
                  name="files"
                  control={control}
                  rules={{
                    required: "Please select at least on file",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  )}
                />
              </div>
              {errors.files && (
                <p className="error text-red-600">{errors.files.message}</p>
              )}
            </div>
          </div>
       <div className="grid gap-4 grid-cols-2 ">
            <Controller
              name="middleName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                 
                  error={errors.middleName && true}
                  {...field}
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                />
              )}
            />
            {errors.middleName && (
              <p className="text-red-600">{errors.middleName.message}</p>
            )}
          </div>

          <div className="grid place-content-center">
            <button
              type="submit"
              className=" bg-slate-500 text-white px-8 py-2 border-2 rounded-sm text-center "
            >
              Submit
            </button>
          </div>
        </form> 
      </div>

    </>
  );
}



