'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NoiseComponent from '@/components/common/NoiseComponent';

/* ---------------- Yup Validation Schema ---------------- */
const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  message: yup.string().required('Message is required'),
});

const GetInTouch = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
  };

  return (
    <section className="bg-white relative overflow-hidden">
      <NoiseComponent />

      <div className="container">
        <div className="py-96">
          <div className="bg-white h-[341px] border-1 border-[#0F1116]" />
        </div>

        <div className="flex justify-center items-center mb-[60px] mt-[-1024px] md:mt-[-945px]">
          <div className="bg-white w-[787px] h-[753px] py-[64px] px-[56px] border-1 border-[#0F1116]">
            <h3 className="font-bold text-[#0F1116] text-xl md:text-[45px] mb-8">
              GET IN TOUCH WITH US
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-8"
              noValidate
            >
              {/* Full Name */}
              <div className="flex flex-col col-span-2">
                <label className="font-bold text-lg text-[#0F1116]">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  placeholder="Your full name"
                  className="text-[#0F1116] p-3 bg-white border border-[#898989] rounded-md"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-bold text-lg text-[#0F1116]">
                  Email ID
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Enter email id"
                  className="text-[#0F1116] p-3 bg-white border border-[#898989] rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="font-bold text-lg text-[#0F1116]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="Enter number"
                  className="text-[#0F1116] p-3 bg-white border border-[#898989] rounded-md"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col col-span-2">
                <label className="font-bold text-lg text-[#0F1116]">
                  Your Address
                </label>
                <textarea
                  rows={2}
                  {...register('address')}
                  placeholder="Enter address"
                  className="text-[#0F1116] p-3 bg-white border border-[#898989] rounded-md"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col col-span-2">
                <label className="font-bold text-lg text-[#0F1116]">
                  Message
                </label>
                <textarea
                  rows={3}
                  {...register('message')}
                  placeholder="Write your message"
                  className="text-[#0F1116] p-3 bg-white border border-[#898989] rounded-md"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end col-span-2">
                <button
                  type="submit"
                  className="btn-11 relative inline-block bg-white text-[#0F1116] font-medium text-sm md:text-[17px] w-[145px] md:w-[185px] h-[44px] md:h-[54px] overflow-hidden transition-all duration-300 hover:text-white border-1 border-[#0F1116]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-10">
          <div className="bg-white w-[430px] h-[125px] flex space-x-10 py-6 pl-10 pr-24 border-1 border-[#0F1116]">
            <Image
              src="/assets/icons/contact-phone.svg"
              alt="Phone"
              width={72}
              height={72}
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg text-[#9D9D9D]">Phone Number</p>
              <p className="text-xl font-medium text-[#0F1116]">
                1 (747) 265-199
              </p>
            </div>
          </div>

          <div className="bg-white w-[430px] h-[125px] flex space-x-10 py-6 pl-10 pr-10 border-1 border-[#0F1116]">
            <Image
              src="/assets/icons/contact-email.svg"
              alt="Email"
              width={72}
              height={72}
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg text-[#9D9D9D]">Email ID</p>
              <p className="text-xl font-medium text-[#0F1116]">
                whiteroom@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
