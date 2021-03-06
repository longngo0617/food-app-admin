import React from "react";
import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import { storage, db } from "../firebase/firebase";
import { UserContext } from "../utils/Provider";
import { SelectFormField } from "./SelectFormField";
import { TextFormField } from "./TextFormField";
interface PopupEditProductProps {
  data: any;
}

export const PopupEditProduct: React.FC<PopupEditProductProps> = ({ data }) => {
  const inputImage: any = React.useRef(null);
  const { newProduct, closeEdit }: any = React.useContext(UserContext);
  const [arrImage, setArrImage] = React.useState<any>([]);
  const { editProduct } = React.useContext(UserContext);
  const [arrImagePrev, setArrImagePrev] = React.useState<any>(newProduct.image);
  const stars = [1, 2, 3, 4, 5];

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

  const handleUpload = async (values: any) => {
    let newArrayImage: any = [];
    for (let i = 0; i < arrImage.length; i++) {
      const fileRef = storage.ref(`images/${arrImage[i].name}`);
      await fileRef.put(arrImage[i]);
      await fileRef.getDownloadURL().then((url) => {
        newArrayImage.push(url);
      });
    }
    return newArrayImage;
  };

  const removeItem = (image: string) => {
    const filtered = arrImagePrev.filter((x: any) => x !== image);
    setArrImagePrev(filtered);
  };
  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        <Formik
          initialValues={newProduct}
          onSubmit={async (values) => {
            const image = await handleUpload(values);
            if (image.length) {
              values.image = image;
            }
            await db
              .collection("Foods")
              .doc(values.id)
              .update(values)
              .then(() => editProduct(values));
            closeEdit();
          }}
        >
          {({ values }) => (
            <Form autoComplete="off">
              <div className="follow-modal">
                <Wrapper>
                  <div
                    className="follow-modal-top"
                    style={{ borderBottom: "0px" }}
                  >
                    <div className="follow-modal-top-icon">
                      <IconButton
                        aria-label="close-icon"
                        color="primary"
                        onClick={() => closeEdit()}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div className="follow-modal-top-text">
                      <h2 className="title">{values.name}</h2>
                    </div>
                    <div className="follow-modal-top-icon">
                      <Button
                        aria-label="close-icon"
                        color="primary"
                        className="btn-save"
                        type="submit"
                      >
                        S???a s???n ph???m
                      </Button>
                    </div>
                  </div>
                </Wrapper>
                <Padding>
                  <div className="follow-modal-bottom">
                    <div className="profile__wrapper">
                      <div className="profile__wrapper">
                        <Note>
                          ???nh
                          <span style={{ margin: "0px 4px" }}>
                            <span>&nbsp;</span>
                            <span>.</span>
                          </span>
                          {`${arrImage.length} / 10`}
                          <span
                            style={{ fontWeight: "normal", marginLeft: "4px" }}
                          >
                            - B???n c?? th??? th??m t???i ??a 10 ???nh
                          </span>
                        </Note>
                        {arrImagePrev.length ? (
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

                            {arrImagePrev.length < 10 && (
                              <ImageSelected style={{ width: "104px" }}>
                                <Center>
                                  <Button
                                    color="default"
                                    aria-label="add product photo"
                                    startIcon={<AddAPhotoIcon />}
                                    onClick={() => inputImage.current.click()}
                                  >
                                    Th??m ???nh
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
                          </ListImageSelected>
                        ) : (
                          <ProductImage>
                            <Div>
                              <Button
                                variant="contained"
                                color="default"
                                aria-label="add product photo"
                                startIcon={<AddAPhotoIcon />}
                                onClick={() => inputImage.current.click()}
                              >
                                Th??m ???nh
                              </Button>
                              <input
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                multiple
                                name="image"
                                type="file"
                                className="input-file"
                                ref={inputImage}
                                onChange={handleImageChange}
                              />
                            </Div>
                          </ProductImage>
                        )}

                        <Field
                          label="T??n s???n ph???m"
                          name="name"
                          component={TextFormField}
                        />

                        <Field
                          label="Gi??"
                          name="price"
                          component={TextFormField}
                        />
                        <Field
                          label="S??? l?????ng"
                          name="quantity"
                          component={TextFormField}
                        />
                        <Field
                          options={data}
                          categories
                          name="typeID"
                          label="Lo???i s???n ph???m"
                          component={SelectFormField}
                        />
                        <Field
                          options={stars}
                          name="star"
                          label="S??? sao"
                          component={SelectFormField}
                        />
                        <Field
                          label="M?? t???"
                          name="describe"
                          multiline
                          rows={8}
                          component={TextFormField}
                        />
                      </div>
                    </div>
                  </div>
                </Padding>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;
const Div = styled.div``;
const WrapText = styled.div`
  margin-bottom: 8px;
  margin-top: 16px;
`;
const Padding = styled.div`
  padding: 0 12px;
`;

const ProductImage = styled.div`
  position: relative;
  margin: 12px 0px;
  height: 160px;
  border-radius: 4px;
  border: 1px solid #ced0d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
const Note = styled.span`
  color: #65676b;
  font-weight: 600;
  line-height: 12px;
  word-break: break-word;
  font-size: 12px;
  margin-top: 12px;
`;
