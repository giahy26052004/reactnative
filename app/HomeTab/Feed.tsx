import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Swiper from "react-native-swiper";
import ItemHome from "./items/itemProduct";
import { GET_ALL, GET_ID, GET_IDCa, GET_IMG, searchProducts } from "../api/apiService";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import ItemProductSale from "./items/itemProductSale";
const Feed = ({ navigation, route }: { route: any; navigation: any }) => {
 
  const [isLoading, setIsLoading] = useState(true);
  const { username = "Guest" } = route.params || {};
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Lưu category đã chọn
  const [categoryProducts, setCategoryProducts] = useState([]); // Lưu sản phẩm theo category
  
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await GET_ALL("categories");
            console.log("API response:", response); // Kiểm tra phản hồi API
    
            if (response && Array.isArray(response.content)) {
                setCategories(response.content);
            } else {
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchCategories();
}, []);
console.log("Categories", categories);
useEffect(() => {
  const fetchProductsByCategory = async () => {
    if (!selectedCategory?.categoryId) return; // Check if categoryId is valid

    try {
      // Call API to get products by category ID
      const response = await GET_IDCa("categories", selectedCategory.categoryId);

      console.log("API Response:", response);

      if (response && Array.isArray(response.content)) {
        // Filter products by matching categoryId
        const filteredProducts = response.content.filter(
          (product) => product.category && product.category.categoryId === selectedCategory.categoryId
        );

        setCategoryProducts(filteredProducts); // Set products for the category

        console.log("Filtered Products:", filteredProducts);
      } else {
        console.error("Unexpected response format:", response);
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
      setCategoryProducts([]);
    }
  };

  fetchProductsByCategory(); // Trigger on selectedCategory change
}, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Start loading before the fetch
      try {
        // Define query parameters for pagination and sorting
        const response = await GET_ALL("products", {
          pageNumber: 0,
          pageSize: 10,
          sortBy: "productId",
          sortOrder: "asc",
        });

        console.log("Response from GET_ALL products:", response);

        if (response && Array.isArray(response.content)) {
          setProducts(response.content); // Set products in the state
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false); // Stop loading after the fetch
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);
  useEffect(() => {
    const fetchProductsSale = async () => {
      setIsLoading(true); // Bắt đầu tải trước khi gọi API
      try {
        // Xác định các tham số truy vấn cho phân trang và sắp xếp
        const response = await GET_ALL("products", {
          pageNumber: 0,
          pageSize: 10,
          sortBy: "productId",
          sortOrder: "asc",
        });
  
        console.log("Response từ GET_ALL products:", response);
  
        if (response && Array.isArray(response.content)) {
          // Duyệt qua các sản phẩm để tính và thêm giá sale
          const productsWithSalePrice = response.content.map((product) => {
            if (product.discount > 0) {
              product.salePrice = product.price * (1 - product.discount / 100); // Tính giá sale
            }
            return product;
          });
  
          setProducts(productsWithSalePrice); // Đặt danh sách sản phẩm bao gồm giá sale vào state
        } else {
          console.error("Định dạng phản hồi không đúng:", response);
        }
      } catch (error) {
        console.error("Không thể lấy sản phẩm:", error);
      } finally {
        setIsLoading(false); // Dừng tải sau khi gọi API xong
      }
    };
  
    fetchProductsSale(); // Gọi hàm khi component được render lần đầu
  }, []);
  
    // Xử lý khi thay đổi input tìm kiếm
    const handleSearchInputChange = useCallback((query) => {
      setSearchQuery(query);
    }, []);
  
    // Xử lý khi bấm tìm kiếm
    const handleSearchSubmit = () => {
      if (searchQuery.trim()) {
        navigation.navigate("SearchResults", { query: searchQuery });
      }
    };
    const handleCategoryPress = (category) => {
      setSelectedCategory(category); // Cập nhật category đã chọn
    };
    
  

  return (
    <ScrollView
      style={styles.mainScrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

       
      <Text style={styles.greeting}>Cộng Cà Phê</Text>
      <Image style={styles.img} source={require('../../assets/images/logo111.png')} />
      </View>

      {/* Search Bar */}
         {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Feather name="search" style={styles.searchIcon} size={24} color="black" onPress={handleSearchSubmit} />
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>

      <Swiper style={styles.wrapper} showsButtons={true}>
        {/* <View style={styles.slide}>
          <Image
            source={require("../../assets/images/hinhnen1.png")}
            style={styles.image}
          />
        </View> */}
        <View style={styles.slide}>
          <Image
            source={require("../../assets/images/hinhnen2.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/images/hinhnen3.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/images/hinhnen4.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/images/hinhnen5.png")}
            style={styles.image}
          />
        </View>
      </Swiper>
      <Text style={styles.text}>Danh mục</Text>

      <View style={styles.categories}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {categories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={styles.categoryButton}
        onPress={() => handleCategoryPress(category)} // Chọn category
      >
        <FontAwesome
          name={category.icon || "coffee"} // Tên icon của category
          style={styles.categoryIcon}
          size={16}
          color="black"
        />
        <Text style={styles.categoryText}>
          {category.categoryName} {/* Tên category */}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>
      {/* Coffee Cards */}
   {/* Coffee Cards */}
<ScrollView
  style={styles.coffeeList}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
>
  <View style={styles.content}>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : categoryProducts.length > 0 ? (
      categoryProducts.map((coffee) => (
        <TouchableHighlight
          key={coffee.product_id} // Gán key tại đây
          style={{ marginBottom: 20, borderRadius: 15 }}
          activeOpacity={0.0}
          underlayColor="#fff"
          onPress={() => {
            const updateCoffee = { ...coffee, total: coffee.price };
            navigation.navigate("ProductDetail", { coffee: updateCoffee });
          }}
        >
          <ItemHome
            imageSource={GET_IMG("products/image", coffee.image)}
            textContent={coffee.productName}
            textPrice={coffee.price}
            textPriceSale={coffee.specialPrice}
          />
        </TouchableHighlight>
      ))
    ) : (
      products.map((coffee) => (
        <TouchableHighlight
          key={coffee.product_id} // Gán key tại đây
          style={{ marginBottom: 20, borderRadius: 15 }}
          activeOpacity={0.0}
          underlayColor="#fff"
          onPress={() => {
            const updateCoffee = { ...coffee, total: coffee.price };
            navigation.navigate("ProductDetail", { coffee: updateCoffee });
          }}
        >
          <ItemHome
            imageSource={GET_IMG("products/image", coffee.image)}
            textContent={coffee.productName}
             textPrice={coffee.price}
            textPriceSale={coffee.specialPrice}
          />
        </TouchableHighlight>
      ))
    )}
  </View>
</ScrollView>
<Text style={styles.text}>Sản phẩm giảm giá</Text>
{/* Discounted Coffee Cards Section */}
<ScrollView
  style={styles.coffeeList}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
>
  <View style={styles.content}>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : products.filter((coffee) => coffee.discount > 0).length > 0 ? (
      // Only show products with a discount
      products
        .filter((coffee) => coffee.discount > 0)
        .map((coffee) => (
          <TouchableHighlight
            key={coffee.product_id}
            style={{ marginBottom: 20, borderRadius: 15 }}
            activeOpacity={0.0}
            underlayColor="#fff"
            onPress={() => {
              const updateCoffee = { ...coffee, total: coffee.price };
              navigation.navigate("ProductDetail", { coffee: updateCoffee });
            }}
          >
            <ItemProductSale
              imageSource={GET_IMG("products/image", coffee.image)}
              textContent={coffee.productName}
              textPrice={coffee.price}
              textPriceSale={coffee.specialPrice} // Assuming salePrice is calculated
            />
          </TouchableHighlight>
        ))
    ) : (
      <Text>No discounted products available</Text>
    )}
  </View>
</ScrollView>
<Text style={styles.text}>Sản phẩm mới nhất</Text>
{/* New Coffee Cards Section */}
<ScrollView
  style={styles.coffeeList}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
>
  <View style={styles.content}>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : products.length > 0 ? (
      // Sort by product_id in descending order to get the newest products
      products
        .sort((a, b) => b.productId - a.productId) // Sort by highest product_id first
        .slice(0, 10) // Get the top 10 products (newest)
        .map((coffee) => (
          <TouchableHighlight
            key={coffee.product_id}
            style={{ marginBottom: 20, borderRadius: 15 }}
            activeOpacity={0.0}
            underlayColor="#fff"
            onPress={() => {
              const updateCoffee = { ...coffee, total: coffee.price };
              navigation.navigate("ProductDetail", { coffee: updateCoffee });
            }}
          >
            <ItemHome
              imageSource={GET_IMG("products/image", coffee.image)}
              textContent={coffee.productName}
              textPrice={coffee.price}
              textPriceSale={coffee.specialPrice} // Assuming salePrice is calculated
            />
          </TouchableHighlight>
        ))
    ) : (
      <Text>No new products available</Text>
    )}
  </View>
</ScrollView>

      {/* Special Offer Section */}
      <View style={styles.specialOfferContainer}>
        <Text style={styles.coffeeSpecial}>Special Offer!</Text>
        <View style={styles.cardSpecial}>
          <Image
            source={require("../../assets/images/Special.png")}
            style={styles.specialImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 15,
    backgroundColor: "#fbfafa",
    paddingTop: 40,
    minHeight: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
  },
  greeting: {
    fontSize: 18,
 marginRight:-160,
    color: '#333',
    fontWeight: 'bold',
    
    
},
img:{
  width:30,
  height:30,
},
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mainScrollView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 25,
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    paddingHorizontal: 15,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F2F2F2", // Light background for inactive buttons
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryButtonActive: {
    backgroundColor: "#8B4513", // Different background for active button
  },
  categoryIcon: {
    marginRight: 8, // Space between icon and text
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextActive: {
    color: "#fff", // Active button text color
  },
  text: {
    fontSize: 30,
    margin: 20,
  },

  coffeeList: {
    paddingHorizontal: 10,
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: 180,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 15,
    height: 290,
  },
  coffeeImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  coffeeTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  priceAndButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#8B4513",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  specialOfferContainer: {
    marginVertical: 20,
  },
  cardSpecial: {
    width: 360,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 15,
    marginLeft: 15,
    height: 200,
  },
  specialImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  specialOfferImage: {
    width: 400,
    marginHorizontal: 10,
    height: 250,
    borderRadius: 15,
  },
  coffeeSpecial: {
    fontSize: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  wrapper: {
    height: 700,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
function debounce(arg0: (query: any) => Promise<void>, arg1: number) {
  throw new Error("Function not implemented.");
}

