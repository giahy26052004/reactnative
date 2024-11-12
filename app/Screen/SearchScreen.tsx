import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { searchProducts } from "../api/apiService";
import { callApi } from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  const searchQuery = route.params?.query || ""; // Nhận từ khóa tìm kiếm từ route

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken"); // Lấy token từ AsyncStorage
        if (!token) {
          console.error("Token không tồn tại");
          setLoading(false);
          return;
        }

        const response = await searchProducts(searchQuery, token);
        setProducts(response.content);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleProductClick = (product) => {
    navigation.navigate("ProductDetail", { coffee: product }); // Điều hướng với dữ liệu sản phẩm đầy đủ
  };
  console.log("Sản phẩm: ",products);
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity  onPress={()=>navigation.navigate('Home')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Tìm kiếm sản phẩm với: "{searchQuery}"</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && products.length === 0 && (
        <Text style={styles.noResults}>Không có sản phẩm "{searchQuery}".</Text>
      )}
      {!loading && products.length > 0 && (
        <View style={styles.productList}>
          {products.map((product) => (
            <TouchableOpacity
            key={product.product_id}
            style={styles.productCard}
            onPress={() => handleProductClick(product)} // Truyền cả đối tượng sản phẩm
          >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `http://localhost:8080/api/public/products/image/${product.image}` }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.badge}>NEW</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.productName}</Text>
                <View style={styles.priceContainer}>
                  {/* <Text style={styles.originalPrice}>{product.price} VND</Text> */}
                  <Text style={styles.specialPrice}>{product.price} VND</Text>
                </View>
                {/* <Text style={styles.verified}>
                  <Text style={{ color: "green" }}>✔</Text> Verified
                </Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noResults: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff5a5f",
    color: "#fff",
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#777",
    marginRight: 8,
  },
  specialPrice: {
    fontSize: 16,
    color: "#e91e63",
    fontWeight: "bold",
  },
  verified: {
    fontSize: 12,
    color: "#333",
  },
});

export default SearchResults;
