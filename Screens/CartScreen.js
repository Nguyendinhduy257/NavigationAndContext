import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';

export default function CartScreen({ navigation }) {
    // Dữ liệu mẫu cho giỏ hàng
    const cartItems = [
        {
            id: 1,
            brand: "Lauren's",
            name: "Orange Juice",
            price: 149,
            quantity: 2,
            // Thay bằng require('../assets/juice.png') nếu bạn có ảnh trong máy
            image: { uri: 'https://images.unsplash.com/photo-1622597467836-f38240662c8b?q=80&w=200' },
        },
        {
            id: 2,
            brand: "Baskin's",
            name: "Skimmed Milk",
            price: 129,
            quantity: 2,
            image: { uri: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200' },
        },
        {
            id: 3,
            brand: "Marley's",
            name: "Aloe Vera Lotion",
            price: 1249,
            quantity: 2,
            image: { uri: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200' },
        },
    ];

    return (
        <View style={styles.container}>
            {/* 1. NÚT BACK */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <ChevronLeft size={28} color="#E8825A" strokeWidth={2.5} />
            </TouchableOpacity>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 2. TIÊU ĐỀ */}
                <Text style={styles.pageTitle}>Your Cart 👍</Text>

                {/* 3. DANH SÁCH SẢN PHẨM */}
                <View style={styles.itemsContainer}>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.cartCard}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.productImage} />
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.brandText}>{item.brand}</Text>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.priceText}>₹ {item.price}</Text>
                            </View>

                            {/* Nút tăng giảm số lượng */}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity>
                                    <Minus size={16} color="#E8825A" />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity>
                                    <Plus size={16} color="#E8825A" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* 4. TỔNG TIỀN VÀ NÚT THANH TOÁN */}
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>₹ 1,527</Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8} onPress={()=>navigation.navigate('PaymentScreen')}>
                        <Text style={styles.checkoutText}>Proceed to checkout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    scrollContent: {
        paddingTop: 120, // Đẩy nội dung xuống dưới nút Back
        paddingHorizontal: 20,
        paddingBottom: 130, // Chừa chỗ cho Bottom Navigation
    },

    // --- Nút Back (Position Absolute để giữ cố định ở góc) ---
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 48,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        zIndex: 10, // Đảm bảo nút nổi lên trên ScrollView
    },

    // --- Tiêu đề ---
    pageTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 25,
    },

    // --- Danh sách sản phẩm ---
    itemsContainer: {
        marginBottom: 30,
    },
    cartCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9', // Màu xám rất nhạt
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
    },
    imageContainer: {
        width: 65,
        height: 65,
        backgroundColor: '#F0EBE1', // Nền màu be của ảnh
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    productImage: {
        width: 35,
        height: 50,
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    brandText: {
        fontSize: 12,
        color: '#A0A0A0',
        marginBottom: 2,
    },
    nameText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 6,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E8825A', // Màu cam đất
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 12,
        color: '#333333',
    },

    // --- Footer (Tổng tiền & Nút Check out) ---
    footer: {
        marginTop: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E8825A',
    },
    checkoutButton: {
        backgroundColor: '#E68F66', // Màu cam đất nhạt
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});