import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./history.css";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
  },
});

const PAGE_SIZE = 20;

const HistoryPDF = ({ signinHistories }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text>Username</Text></View>
          <View style={styles.tableColHeader}><Text>Email</Text></View>
          <View style={styles.tableColHeader}><Text>Signin Date</Text></View>
        </View>
        {signinHistories.map((signinHistory, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text>{signinHistory.username}</Text></View>
            <View style={styles.tableCol}><Text>{signinHistory.email}</Text></View>
            <View style={styles.tableCol}><Text>{new Date(signinHistory.signinDate).toLocaleString()}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const History = () => {
  const [signinHistories, setSigninHistories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSigninHistory = async () => {
      try {
        const response = await fetch("api/signinhistory/history");
        if (!response.ok) {
          throw new Error("Failed to fetch signin history");
        }
        const signinHistoriesData = await response.json();
        setSigninHistories(signinHistoriesData);
      } catch (error) {
        console.error("Error fetching signin history:", error);
      }
    };

    fetchSigninHistory();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const filteredHistories = signinHistories.filter(
    (history) =>
      history.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      history.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHistories.length / PAGE_SIZE);
  const paginatedHistories = filteredHistories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h1 className="h1">
                  <b>User Sign in History</b>
                </h1>
              </div>
              <form class="max-w-md mx-auto">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" value={searchQuery} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search with name, email..." required />
                  <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
              </form>

            </div>
          </div>
          <table id="history">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Signin Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistories.map((signinHistory, index) => (
                <tr key={index}>
                  <td>{signinHistory.username}</td>
                  <td>{signinHistory.email}</td>
                  <td>
                    {new Date(signinHistory.signinDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center">
            <button onClick={prevPage} disabled={currentPage === 1} className="bg-green-500 text-white py-1 px-4 rounded mr-2 w-30 h-9">
              &lt;&lt; Previous
            </button>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-green-500 text-white py-1 px-4 rounded w-30 h-9">
              Next &gt;&gt;
            </button>
          </div>
          <div className="btn1">
            <PDFDownloadLink
              document={<HistoryPDF signinHistories={paginatedHistories} />}
              fileName="signin_history.pdf"
            >
              {({ loading }) => (loading ? "Loading document..." : "Download Login history as a PDF")}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
