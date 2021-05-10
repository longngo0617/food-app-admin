import { Button, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { TextFormField } from "./TextFormField";
import CloseIcon from "@material-ui/icons/Close";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../utils/Provider";

interface FormTypeProps {}

export const FormType: React.FC<FormTypeProps> = () => {
  const inputImage: any = React.useRef(null);
  const { getDataType, openAlert, closeAlert } = React.useContext(UserContext);
  const [arrImage, setArrImage] = React.useState<any>([]);
  const [arrImagePrev, setArrImagePrev] = React.useState<any>([]);
  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setArrImage(e.target.files);
      const fileArr = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setArrImagePrev((prev: any) => prev.concat(fileArr));
      Array.from(e.target.files).map((file: any) => URL.revokeObjectURL(file));
    }
  };

  const removeItem = (image: string) => {
    const filtered = arrImagePrev.filter((x: any) => x !== image);
    setArrImagePrev(filtered);
  };

  const handleUpload = async (values: any) => {
    const fileRef = storage.ref(`images/${arrImage[0].name}`);
    await fileRef.put(arrImage[0]);
    await fileRef.getDownloadURL().then((url) => {
      values.image = url;
      return db
        .collection("TypeFoods")
        .add(values)
        .then((docRef) => {
          values.idType = docRef.id;
          getDataType(values);
        });
    });
  };
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Thêm loại sản phẩm
      </Typography>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values, formik) => {
          await handleUpload(values);
          formik.resetForm();
          setArrImagePrev([]);
          setArrImage([]);
          await openAlert();
          const timeId = setTimeout(() => {
            closeAlert();
          }, 3000);

          return () => {
            clearTimeout(timeId);
          };
        }}
      >
        {() => (
          <Form autoComplete="off">
            <Field
              label="Tên loại sản phẩm"
              name="name"
              component={TextFormField}
            />
            <ListImageSelected>
              {arrImagePrev.map((m: string, i: number) => (
                <ImageSelected key={i} style={{ width: "104px" }}>
                  <Image>
                    <ImageP>
                      <ImageM src={m} />
                    </ImageP>
                    <ImageC>
                      <CloseIcon onClick={() => removeItem(m)} />
                    </ImageC>
                  </Image>
                </ImageSelected>
              ))}
            </ListImageSelected>
            {!arrImagePrev.length && (
              <ImageSelected style={{ width: "104px" }}>
                <Center>
                  <Button
                    color="default"
                    aria-label="add product photo"
                    startIcon={<AddAPhotoIcon />}
                    onClick={() => inputImage.current.click()}
                  >
                    Thêm ảnh
                  </Button>
                  <input
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    type="file"
                    className="input-file"
                    ref={inputImage}
                    onChange={handleImageChange}
                  />
                </Center>
              </ImageSelected>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Thêm loại sản phẩm
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
const Container = styled.div`
  width: 50%;
  border: 1px solid #e6ecf0;
  padding: 12px 16px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div``;
const Div = styled.div``;

const ListImageSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
`;

const ImageSelected = styled.div`
  position: relative;
  margin: 4px;
`;

const Image = styled.div`
  border-radius: 4px;
  position: relative;
`;
const ImageM = styled.img`
  position: absolute;
  border-radius: 4px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageP = styled.div`
  padding-bottom: 100%;
  width: 100%;
  position: relative;
`;

const ImageC = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #e4e6eb;
  height: 100%;
`;
