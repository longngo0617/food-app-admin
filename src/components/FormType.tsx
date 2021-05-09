import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { TextFormField } from "./TextFormField";
import CloseIcon from "@material-ui/icons/Close";

interface FormTypeProps {}

export const FormType: React.FC<FormTypeProps> = () => {
  const inputImage: any = React.useRef(null);
  const [arrImage, setArrImage] = React.useState<any>([]);
  const [arrImagePrev, setArrImagePrev] = React.useState<any>([]);
  const [image, setImage] = React.useState([]);
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
  return (
    <Container>
      <div>
        <Formik
          initialValues={{
            name: "",
            image: "",
          }}
          onSubmit={async (values, formik) => {
            await formik.resetForm();
            setArrImagePrev([]);
            setArrImage([]);
            setImage([]);
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
              {!arrImagePrev.length  && (
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
              <Button type="submit" variant="contained" color="primary"> 
                  Thêm loại sản phẩm
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
const Container = styled.div``;

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

