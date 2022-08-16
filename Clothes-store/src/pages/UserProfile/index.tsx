import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditUser, GetUserInfo, UploadFile } from "../../api/UserApi";
import MainLayout from "../../layouts/MainLayout";
import { UserProfileWrapper } from "./style";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserInfo } from "../../types/user.types";

const UserProfile = () => {
  // const [imageFiles, setImageFiles] = useState<any>([]);
  // const [images, setImages] = useState<any>([]);

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [picture, setPicture] = useState<any>(null);
  const [imgData, setImgData] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      avatar: "",
      phone: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("không được để trống"),
      fullname: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("không được để trống"),
      email: Yup.string()
        .email("Invalid email format")
        .required("không được để trống"),
      avatar: Yup.string(),
      phone: Yup.string().required("không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
      editUser(values);
    },
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const req = await GetUserInfo("http://localhost:8000/api/user-profile");
        if (req.data) {
          formik.setValues({
            fullname: req.data.fullname,
            username: req.data.username,
            avatar: req.data.avatar,
            email: req.data.email,
            phone: req.data.phone,
          });
          setUserInfo(req.data);
          setImgData(req.data.avatar);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  //upload single file
  const onChangePicture = async (e: any) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // upload multiple file
  // const changeHandler = (e: any) => {
  //   const { files } = e.target;
  //   const validImageFiles = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     if (file.type.match(imageTypeRegex)) {
  //       validImageFiles.push(file);
  //     }
  //   }
  //   if (validImageFiles.length) {
  //     setImageFiles(validImageFiles);
  //     return;
  //   }
  //   alert("Selected images are not of valid type!");
  // };

  // useEffect(() => {
  //   const images: any = [];
  //   const fileReaders: any = [];
  //   let isCancel = false;
  //   if (imageFiles.length) {
  //     imageFiles.forEach((file: any) => {
  //       const fileReader = new FileReader();
  //       fileReaders.push(fileReader);
  //       fileReader.onload = (e: any) => {
  //         const { result } = e.target;
  //         if (result) {
  //           images.push(result);
  //         }
  //         if (images.length === imageFiles.length && !isCancel) {
  //           setImages(images);
  //         }
  //       };
  //       fileReader.readAsDataURL(file);
  //     });
  //   }
  //   return () => {
  //     isCancel = true;
  //     fileReaders.forEach((fileReader: any) => {
  //       if (fileReader.readyState === 1) {
  //         fileReader.abort();
  //       }
  //     });
  //   };
  // }, [imageFiles]);

  useEffect(() => {
    if (picture) {
      uploadFile();
    } else {
      formik.setFieldValue("avatar", "");
    }
  }, [picture]);

  const editUser = async (data: any) => {
    try {
      const req = await EditUser(
        `http://localhost:8000/api/user/${userInfo?._id}`,
        data
      );
      if (req.data) {
        toast.success("sửa thành công!!!");
      }
    } catch (error) {
      toast.error("sửa thất bại!!!");
    }
  };

  const uploadFile = async () => {
    // for (let i = 0; i < imageFiles.length; i++) {
    //   formData.append("listImage", imageFiles[i]);
    // }

    const formData = new FormData();
    formData.append("avatar", picture);
    formData.append("upload_preset", "xw4yrog1");
    try {
      const req = await axios.post(
        "http://localhost:8000/api/upload/single",
        formData
      );
      if (req.data) {
        formik.values.avatar = req.data.url;
      }
    } catch (error) {
      toast.error("không thành công");
    }
  };

  return (
    // <div>
    //   demo upload
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUserName(e.target.value)}
    //     />

    //     <input
    //       type="file"
    //       id="listImage"
    //       name="listImage"
    //       accept="image/png, image/jpeg,image/jpg"
    //       onChange={changeHandler}
    //       multiple
    //     />
    //     {images.length > 0 ? (
    //       <div style={{ display: "flex" }}>
    //         {images.map((image: any, idx: number) => {
    //           return (
    //             <p key={idx}>
    //               {" "}
    //               <img src={image} alt="" />{" "}
    //             </p>
    //           );
    //         })}
    //       </div>
    //     ) : null}
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <MainLayout>
      <UserProfileWrapper>
        <div className="profile__container">
          <div className="profile--title">Hồ sơ của tôi</div>
          <div className="profile__detail">
            <div className="detail__form">
              <form onSubmit={formik.handleSubmit}>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "2" }}>
                    <div className="form__group">
                      <label htmlFor="">Tên Đăng nhập:</label>
                      <input
                        type={"text"}
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        disabled={true}
                      ></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Họ và Tên:</label>
                      <input
                        type={"text"}
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Email:</label>
                      <input
                        type={"text"}
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Số điện thoại:</label>
                      <input
                        type={"text"}
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                  </div>

                  <div className="detail__avatar">
                    <div className="detail__avatar--image">
                      <img
                        src={
                          imgData ||
                          "https://res.cloudinary.com/dchzdgm6r/image/upload/v1660201417/kbdauuynndodajkh1wp3.jpg"
                        }
                        alt="img"
                      />
                    </div>
                    <div className="detail__avatar--btn">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        onChange={onChangePicture}
                      />
                    </div>
                    <br />
                    <div className="detail__avatar--desc">
                      Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                    </div>
                  </div>
                </div>

                <button type={"submit"}>Lưu</button>
              </form>
            </div>
          </div>
        </div>
      </UserProfileWrapper>
    </MainLayout>
  );
};

export default UserProfile;
