import { useEffect, useState } from 'react'
import './App.css'

async function getCurrency(currency) {
  let res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`,
  )
  let data = await res.json()
  return data[currency]
}

function App() {
  let keyValue = 0
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('inr')
  const [toCurrency, setToCurrency] = useState('usd')
  const [data, setData] = useState([])

  function swap() {
    setFromAmount(toAmount)
    setToAmount(fromAmount)
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  useEffect(() => {
    async function printData() {
      let data = await getCurrency(toCurrency)
      setData(Object.keys(data))
      console.log(Object.keys(data))
      setToAmount((data[fromCurrency] * fromAmount).toFixed(2))
    }
    printData()
  }, [toAmount, fromAmount, toCurrency, fromCurrency])

  return (
    <>
      <div className="container">
        <div className="box">
          <div className="header">currency convertor</div>
          <div className="from">
            <input
              className="amount"
              value={fromAmount}
              onChange={(e) => setFromAmount(Number(e.target.value))}
            />
            <div className="flagText">{fromCurrency}</div>
          </div>
          <div className="to">
            <input
              style={{ cursor: 'default' }}
              readOnly
              className="amount"
              value={toAmount}
              onChange={(e) => setToAmount(Number(e.target.value))}
            />

            <div className="flagText">{toCurrency} </div>
          </div>
          <div className="convertor-container">
            <select
              id="from"
              onChange={(e) => setFromCurrency(e.target.value)}
              value={fromCurrency}
            >
              {data.map((e) => (
                <option key={++keyValue} value={e}>
                  {e.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="mid" onClick={swap}>
              <div className="up"></div>
              <div className="down"></div>
            </div>
            <select
              onChange={(e) => setToCurrency(e.target.value)}
              id="to"
              value={toCurrency}
            >
              {data.map((e) => (
                <option key={++keyValue} value={e}>
                  {e.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <button>Convert</button>
        </div>
      </div>
    </>
  )
}

export default App
