import { useState } from 'react'
import { API } from '../config/axiosConfig'


const useExcelDownload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const downloadExcel = async (apiEndPoint, searchData, fileName) => {
    try {
      setIsLoading(true)

      const response = await API.post(
        apiEndPoint,
        searchData,
        {
          timeout: 3000,
          responseType: "blob", // Specify responseType as 'blob' to receive binary data
        },
      );
      console.log('Response', response)
      //check response
      if (response.status !== 200) {
        throw new Error('Failed to fetch data')
      }

      const excelBlob = new Blob([response?.data], {
        type: response.headers['content-type'],
      })

      // Create download link and trigger the download
      const url = window.URL.createObjectURL(excelBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${fileName}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)

      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setError(err.message)
    }
  }
  return { downloadExcel, isLoading, error }
}

export default useExcelDownload
