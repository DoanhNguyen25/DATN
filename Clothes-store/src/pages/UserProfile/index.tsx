import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UploadFile } from "../../api/UserApi";
import MainLayout from "../../layouts/MainLayout";
import { UserProfileWrapper } from "./style";
import { useFormik } from "formik";
import * as Yup from "yup";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const UserProfile = () => {
  const [username, setUserName] = useState("");
  // const [imageFiles, setImageFiles] = useState<any>([]);
  // const [images, setImages] = useState<any>([]);

  const [picture, setPicture] = useState<any>(null);
  const [imgData, setImgData] = useState<any>(null);

  //upload single file
  const onChangePicture = (e: any) => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("không được để trống"),
      email: Yup.string()
        .email("Invalid email format")
        .required("không được để trống"),
      phone: Yup.string().required("không được để trống"),
      address: Yup.string().required("không được để trống"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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

  const uploadFile = async () => {
    const formData = new FormData();
    // for (let i = 0; i < imageFiles.length; i++) {
    //   formData.append("listImage", imageFiles[i]);
    // }

    formData.append("image", picture);
    formData.append("upload_preset", "xw4yrog1");
    try {
      const req = await axios.post(
        "http://localhost:8000/api/upload/multiple",
        formData
      );
      console.log(req.data);
    } catch (error) {
      toast.error("không thành công");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    uploadFile();
    // console.log(imageFiles);
    // console.log({ username, imgUrl: picture.name });
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
              <form>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "2" }}>
                    <div className="form__group">
                      <label htmlFor="">Tên Đăng nhập:</label>
                      <input type={"text"}></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Họ và Tên:</label>
                      <input type={"text"}></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Email:</label>
                      <input type={"text"}></input>
                    </div>
                    <div className="form__group">
                      <label htmlFor="">Số điện thoại:</label>
                      <input type={"text"}></input>
                    </div>
                  </div>

                  <div className="detail__avatar">
                    <div className="detail__avatar--image">
                      <img src={imgData} alt="img" />
                    </div>
                    <div className="detail__avatar--btn">
                      <input
                        type="file"
                        name="image"
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

                <button>Lưu</button>
              </form>
            </div>
          </div>
        </div>
      </UserProfileWrapper>
    </MainLayout>
  );
};

export default UserProfile;
