import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/public",
});

async function callApi(endpoint, method = "GET", body, params) {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Retrieved Token:", token);   
    const queryString = params ? new URLSearchParams(params).toString() : "";
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const config = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
        data: body ? JSON.stringify(body) : null,
    };

    return axiosInstance(config)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized. Redirecting to login.");
                // Handle unauthorized case
            } else {
                console.error("API call error:", error);
            }
            throw error;
        });
}

export const GET_ALL = (endpoint, params) => {
    console.log("Calling API with endpoint:", endpoint);
    return callApi(endpoint, "GET", null, params); // Pass just the endpoint
};

export function GET_ID(endpoint, id) {
  return callApi(`${endpoint}/${id}`, "GET");
}
export function GET_IDCa(endpoint, id) {
  return callApi(`${endpoint}/${id}/products`, "GET"); // Use categoryId in the URL path
}

export function POST_ADD(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
  return callApi(endpoint, "DELETE");
}
export function GET_IMG(endpoint, imgName) {
  const imageURL = `http://localhost:8080/api/public/${endpoint}/${imgName}`; // Đảm bảo định dạng đúng
  console.log("Generated Image URL: ", imageURL); // Log URL
  return imageURL;
}
export async function LOGIN(body) {
  const API_URL_LOGIN = "http://localhost:8080/api/login";

  try {
    const response = await axios.post(API_URL_LOGIN, body, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const token = response.data.token || response.data["jwt-token"];
      if (token) {
        await AsyncStorage.setItem("authToken", token);
      } else {
        console.error("Token not found in response");
      }
    } else {
      console.error("Login failed with status:", response.status);
    }
    return response;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
}

export const searchProducts = async (keyword, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/public/products/keyword/${keyword}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    throw error;
  }
};


export async function REGISTER(data, navigate) {
  const API_URL_REGISTER = "http://localhost:8080/api/register";

  // Ensure data is structured correctly for the API
  const payload = {
    userId: 0,
    firstName: data.firstName,
    lastName: data.lastName,
    mobileNumber: data.mobileNumber,
    email: data.email,
    password: data.password,
    roles: data.roleName ? [{ roleId: 0, roleName: data.roleName }] : [{ roleId: 0, roleName: 'USER' }],
    address: data.address || {
      addressId: 0,
      street: "Default Street",
      buildingName: "Default Building",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      pincode: "000000",
    },
    cart: data.cart || {
      cartId: 0,
      totalPrice: 0,
      products: [{
        productId: 0,
        productName: "Default Product",
        image: "default.png",
        description: "Default Description",
        quantity: 1,
        price: 0,
        discount: 0,
        specialPrice: 0,
        categoryId: 0,
      }],
    },
  };

  try {
    // Log the payload to ensure the structure is correct
    console.log(payload);

    const response = await axios.post(API_URL_REGISTER, payload, {
      headers: { "Content-Type": "application/json" },
    });

    Alert.alert("Success", "Registration successful!");
  // Use the navigation function for redirect
    return { success: true, message: response.data.message || "Registration successful" };
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed. Please try again.";
    console.error("Error details:", error.response?.data);  // Log the error response
    Alert.alert("Error", message);
    return { success: false, message };
  }
}

export async function ADDCART(cartId, productId, quantity) {
  const API_URL_ADDCART = `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/${quantity}`;

  try {
    const token = await AsyncStorage.getItem('authToken');
    const storedCartId = await AsyncStorage.getItem('cartId');
    
    if (!token) {
      console.error("Token not found, unable to add product to cart");
      throw new Error("Token not found");
    }
    
    if (!cartId && !storedCartId) {
      console.error("Cart ID not found, unable to add product to cart");
      throw new Error("Cart ID not found");
    }

    const response = await axios.post(API_URL_ADDCART, null, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Product added to cart successfully with status:", response.status);
      return response;
    } else {
      console.error("Failed to add product to cart:", response.status);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;  
  }
}


export async function REMOVEFROMCART(cartId, productId) {
  const API_URL_REMOVEFROMCART = `http://localhost:8080/api/public/carts/${cartId}/product/${productId}`;

  try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.delete(API_URL_REMOVEFROMCART, {
          headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.status === 200) {
          console.log("Product removed from cart in database successfully");
      } else {
          console.error("Failed to remove product from cart in database", response.status);
      }
  } catch (error) {
      console.error("Error removing product from cart in database:", error);
  }
}
export async function ADD_ORDER(emailId, cartId, paymentMethod) {
  const API_URL_ADD_ORDER = `http://localhost:8080/api/public/users/${emailId}/carts/${cartId}/payments/${paymentMethod}/order`;

  try {
      const token = await AsyncStorage.getItem('authToken');
      console.log("Token:", token);
      const response = await axios.post(API_URL_ADD_ORDER, {}, {
          headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.status === 200 || response.status === 201 ) {
          console.log("Add order successfully");
      } else {
          console.error("Failed to Add order", response.status);
      }
  } catch (error) {
      console.error("Error Add order:", error);
  }
}
export async function GETALL_ORDER(emailId) {
  const API_URL_GET_ALL_ORDERS = `http://localhost:8080/api/public/users/${emailId}/orders`;

  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log("Token:", token);

    const response = await axios.get(API_URL_GET_ALL_ORDERS, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Fetched orders successfully:", response.data);
      return response.data;  // Return the fetched orders data
    } else {
      console.error("Failed to fetch orders", response.status);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}
export async function CHANGEPASS(userId, data) {
  const API_URL_CHANGEPASS = `http://localhost:8080/api/public/users/${userId}`;

  try {
      const token = await AsyncStorage.getItem('authToken');

      // Logging for debugging
      console.log("Request URL:", API_URL_CHANGEPASS);
      console.log("Request Headers:", {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      });
      console.log("Request Data:", data);

      const response = await axios.put(API_URL_CHANGEPASS, data, {
          headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.status === 200 || response.status === 201) {
          Alert.alert("Success", "Password changed successfully!");
          return response;
      } else {
          console.error("Change password failed with status:", response.status);
          throw new Error("Failed to change password");
      }
  } catch (error) {
      console.error("Change pass error:", error);
      if (error.response && error.response.status === 400) {
          console.error("Bad Request:", error.response.data);
      }
      throw error;
  }
}
