import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import Header from '../component/Header/header';

const UserPage = () => {

    const history = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    //get data from local storage and display
    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }
    //check token and nevigate to populate quote
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                history('/login')
            } else {
                populateQuote()
            }
        }
    })
     //update data
    async function updateQuote(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
        }
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row main-content text-center">
                    <div className="card" >
                        <h5 className="card-header">Welcome to the user page</h5>
                        <div className="card-body">
                            <h5 className="card-title">Your quote: {quote || 'No quote found'}</h5>
                            <div className="card-text"><form onSubmit={updateQuote}>
                                <div className="row">
                                    <input
                                        style={{height:"8rem"}}
                                        type="text"
                                        placeholder="Quote"
                                        value={tempQuote}
                                        onChange={(e) => setTempQuote(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update quote" className="btn btn-primary" />
                            </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage;