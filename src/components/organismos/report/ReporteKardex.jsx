import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import styled from "styled-components";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 3, // Ajustar el espacio vertical entre filas
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5, // Ajustar el espacio interno de las celdas
  },
  headerRow: {
    backgroundColor: "#ADD8E6", // Color de fondo azul claro
  },
  evenRow: {
    backgroundColor: "#F0F8FF", // Color de fondo para filas pares
  },
  oddRow: {
    backgroundColor: "#D3D3D3", // Color de fondo para filas impares
  },
  title: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export function ReporteKardex({ data }) {
  const renderTableRow = (rowData, isHeader = false, index) => (
    <View
      style={[
        styles.row,
        isHeader && styles.headerRow, // Aplicar el estilo de fila de encabezado si es necesario
        !isHeader && index % 2 === 0 ? styles.evenRow : styles.oddRow, // Alternar entre colores para filas de datos
      ]}
    >
      <View style={[styles.cell, { flex: 2 }]}>
        <Text>{rowData.fecha}</Text>
      </View>
      <View style={[styles.cell, { flex: 4 }]}>
        <Text>{rowData.descripcion}</Text>
      </View>
      <View style={[styles.cell, { flex: 3 }]}>
        <Text>{rowData.detalle}</Text>
      </View>
      <View style={[styles.cell, { flex: 1 }]}>
        <Text>{rowData.cantidad}</Text>
      </View>
    </View>
  );

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>Movimientos de Kardex</Text>
            <Text style={styles.title}>Fecha y Hora de Impresión: {formattedDate}</Text>
            {renderTableRow(
              {
                fecha: "Fecha",
                descripcion: "Producto",
                detalle: "Movimiento",
                cantidad: "Cantidad",
              },
              true
            )}
            {data?.map((item, index) => (
              <View key={index}>{renderTableRow(item, false, index)}</View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const Container = styled.div``;