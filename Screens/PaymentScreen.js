import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ChevronLeft, CreditCard, Scan, HelpCircle, Lock } from 'lucide-react-native';

export default function PaymentScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* 1. HEADER (Nền trắng, bo góc dưới) */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft size={28} color="#55CB73" strokeWidth={2.5} />
                </TouchableOpacity>

                <View style={styles.headerTitleRow}>
                    <Text style={styles.pageTitle}>Checkout 💳</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalAmount}>₹ 1,527</Text>
                        <Text style={styles.taxText}>Including GST (18%)</Text>
                    </View>
                </View>

                {/* 2. CHỌN PHƯƠNG THỨC THANH TOÁN */}
                <View style={styles.paymentMethods}>
                    <TouchableOpacity style={[styles.methodTab, styles.activeMethod]}>
                        <CreditCard size={20} color="#FFFFFF" />
                        <Text style={styles.activeMethodText}>Credit card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.methodTab}>
                        {/* Giả lập icon Apple bằng text */}
                        <Text style={styles.inactiveMethodText}> Apple Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
                {/* 3. FORM NHẬP THÔNG TIN THẺ */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Card number</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="5261   4141   0151   8472"
                            placeholderTextColor="#333"
                            keyboardType="number-pad"
                        />
                        {/* Giả lập icon Mastercard bằng 2 hình tròn đè nhau */}
                        <View style={styles.mastercardIcon}>
                            <View style={[styles.circle, { backgroundColor: '#EB001B', right: -5 }]} />
                            <View style={[styles.circle, { backgroundColor: '#F79E1B', opacity: 0.8 }]} />
                        </View>
                        <TouchableOpacity>
                            <Scan size={24} color="#A0A0A0" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Cardholder name</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Christie Doe"
                            placeholderTextColor="#333"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 15 }]}>
                        <Text style={styles.label}>Expiry date</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="06  /  2024"
                                placeholderTextColor="#333"
                            />
                        </View>
                    </View>

                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>CVV / CVC</Text>
                            <HelpCircle size={14} color="#55CB73" style={{ marginLeft: 5 }} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="915"
                                placeholderTextColor="#333"
                                keyboardType="number-pad"
                                secureTextEntry
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* 4. FOOTER (Ghi chú & Nút Pay) */}
            <View style={styles.footer}>
                <Text style={styles.footerNote}>
                    We will send you an order details to your{'\n'}email after the successfull payment
                </Text>
                <TouchableOpacity style={styles.payButton} activeOpacity={0.8} onPress={()=>navigation.navigate('SuccessScreen')}>
                    <Lock size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
                    <Text style={styles.payButtonText}>Pay for the order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB' },
    // Header styles
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20,
        borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 10, elevation: 5,
        zIndex: 10,
    },
    backButton: {
        width: 48, height: 48,
        backgroundColor: '#F8F9FB', borderRadius: 14,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 20,
    },
    headerTitleRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 25,
    },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
    totalContainer: { alignItems: 'flex-end' },
    totalAmount: { fontSize: 22, fontWeight: 'bold', color: '#55CB73' },
    taxText: { fontSize: 12, color: '#A0A0A0', marginTop: 2 },

    // Payment Methods Tab
    paymentMethods: {
        flexDirection: 'row', backgroundColor: '#F8F9FB',
        borderRadius: 20, padding: 5,
    },
    methodTab: {
        flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        paddingVertical: 15, borderRadius: 15,
    },
    activeMethod: { backgroundColor: '#61D282', shadowColor: '#61D282', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    activeMethodText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    inactiveMethodText: { color: '#333333', fontSize: 16, fontWeight: 'bold' },

    // Form styles
    formContainer: { padding: 20 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#333333', marginBottom: 10 },
    labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, height: 55,
    },
    input: { flex: 1, fontSize: 16, color: '#1A1A1A' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },

    // Fake Mastercard icon
    mastercardIcon: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
    circle: { width: 14, height: 14, borderRadius: 7 },

    // Footer styles
    footer: { padding: 20, paddingBottom: 40, backgroundColor: '#F8F9FB' },
    footerNote: { textAlign: 'center', fontSize: 12, color: '#A0A0A0', marginBottom: 20, lineHeight: 18 },
    payButton: {
        flexDirection: 'row', backgroundColor: '#61D282',
        borderRadius: 16, height: 60, justifyContent: 'center', alignItems: 'center',
        shadowColor: '#61D282', shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
    },
    payButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});