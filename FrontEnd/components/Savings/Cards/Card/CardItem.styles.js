import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({

    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        margin: -9
    },
    cardBackground: {
        height: 300,
        width: 300,
        margin: 10,
        borderRadius: 20,
        padding: 30,
        marginBottom: 20

    },
    seasonIcon: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      seasonIcon: {
        marginRight: 10,
      },
      cardLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
      },
      summary: {
        marginVertical: 10,
      },
      cardValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
      },
      amount: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2E86C1",
      },
      cardCategory: {
        fontSize: 14,
        color: "#777",
      },
      subscriptionsContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
      },
      subscriptionsTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 5,
      },
      cardSubscriptions: {
        fontSize: 14,
        color: "#444",
      },
});

export default styles;