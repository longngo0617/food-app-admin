import { createContext, useReducer } from "react";

const initState = {
  dataType: [],
  products: [],
  listItemBill :[],
  success: false,
  newProduct: {},
  stateEdit: false,
  stateBill:false,
};

const UserContext = createContext({
  dataType: [],
  products: [],
  listItemBill :[],
  success: false,
  stateBill:false,
  newProduct: {},
  stateEdit: false,
  getDataType: (item: any) => {},
  getProducts: (item: any) => {},
  removeProduct: (item: any) => {},
  openAlert: () => {},
  closeAlert: () => {},
  openEdit: (product: any) => {},
  closeEdit: () => {},
  editProduct: (product: any) => {},
  removeDataType: (item: string) => {},
  openBill:(data:any) => {},
  closeBill: () => {},
});

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_DATA_TYPE":
      return {
        ...state,
        dataType: state.dataType.concat(action.payload),
      };
    case "REMOVE_DATA_TYPE":
      const filtered = state.dataType.filter(
        (x: any) => x.idType !== action.payload
      );
      return {
        ...state,
        dataType: filtered,
      };
    case "ADD_DATA_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "REMOVE_DATA_PRODUCT":
      const filteredProduct = state.products.filter(
        (x: any) => x.id !== action.payload
      );
      return {
        ...state,
        products: filteredProduct,
      };
    case "OPEN_ALERT":
      return {
        ...state,
        success: true,
      };
    case "CLOSE_ALERT":
      return {
        ...state,
        success: false,
      };
    case "OPEN_EDIT_PRODUCT":
      return {
        ...state,
        stateEdit: true,
        newProduct: action.payload,
      };
    case "CLOSE_EDIT_PRODUCT":
      return {
        ...state,
        stateEdit: false,
        newProduct: {},
      };
    case "EDIT_PRODUCT":
      const index = state.products.findIndex(
        (e: any) => e.id === action.payload.id
      );
      state.products[index] = action.payload;
      return {
        ...state,
        products: [...state.products],
      };
    case "OPEN_BILL": 
      return {
        ...state,
        listItemBill:action.payload,
        stateBill:true,
      }
    case "CLOSE_BILL": 
      return {
        ...state,
        listItemBill:[],
        stateBill:false,
      }
    default:
      return state;
  }
};

const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  const getDataType = (item: any) => {
    dispatch({ type: "ADD_DATA_TYPE", payload: item });
  };

  const removeDataType = (item: string) => {
    dispatch({ type: "REMOVE_DATA_TYPE", payload: item });
  };

  const getProducts = (item: any) => {
    dispatch({ type: "ADD_DATA_PRODUCT", payload: item });
  };

  const removeProduct = (item: any) => {
    dispatch({ type: "REMOVE_DATA_PRODUCT", payload: item });
  };
  const openAlert = () => {
    dispatch({ type: "OPEN_ALERT" });
  };

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT" });
  };

  const openEdit = (product: any) => {
    dispatch({ type: "OPEN_EDIT_PRODUCT", payload: product });
  };

  const closeEdit = () => {
    dispatch({ type: "CLOSE_EDIT_PRODUCT" });
  };
  const editProduct = (product: any) => {
    dispatch({ type: "EDIT_PRODUCT", payload: product });
  };

  const openBill = (data: any) => {
    dispatch({type: "OPEN_BILL",payload:data})
  }
  const closeBill = (listItem: any) => {
    dispatch({type: "CLOSE_BILL"})
  }

  const values = {
    dataType: state.dataType,
    success: state.success,
    products: state.products,
    newProduct: state.newProduct,
    stateEdit: state.stateEdit,
    stateBill : state.stateBill,
    listItemBill : state.listItemBill,
    editProduct,
    closeEdit,
    openEdit,
    removeProduct,
    getDataType,
    getProducts,
    openAlert,
    closeAlert,
    removeDataType,
    openBill,
    closeBill,
  };
  return <UserContext.Provider value={values} {...props} />;
};

export { UserContext, UserProvider };
