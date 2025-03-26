import React, { useContext, useState, useEffect } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { User } from '../context/User';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function ProfilePage() {
    const { newUser } = useContext(User);
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState({
        wins: 0,
        losses: 0,
        maxWPM: 0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPrivate.post(
                    "http://localhost:8000/matches/getdata",
                    { userEmail: newUser.email }
                );
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (newUser?.email) {
            fetchUserData();
        }
    }, [newUser, axiosPrivate]);

    // Calculate win rate
    const totalGames = userData.wins + userData.losses;
    const winRate = totalGames > 0 
        ? ((userData.wins / totalGames) * 100).toFixed(1) 
        : 0;

    return (
        <section style={{ 
            background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
            minHeight: '100vh',
            color: 'white',
            padding: '4rem 0'
        }}>
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol lg="4" className="mb-4">
                        {/* Profile Card */}
                        <MDBCard className="h-100" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px'
                        }}>
                            <MDBCardBody className="text-center">
                                <div className="mb-4">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            border: '4px solid #00ff88',
                                            padding: '4px',
                                            backgroundColor: '#2d2d2d'
                                        }}
                                        fluid
                                    />
                                </div>
                                <h4 className="mb-2" style={{ color: '#00ff88' }}>{newUser.username}</h4>
                                <p className="text-white-50 mb-4">Full Stack Developer</p>
                                
                                {/* Stats Section */}
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="px-3">
                                        <h5 className="mb-0" style={{ color: '#00ff88' }}>{userData.maxWPM}</h5>
                                        <small className="text-white-50">Max WPM</small>
                                    </div>
                                    <div className="px-3 border-start border-end">
                                        <h5 className="mb-0" style={{ color: '#00ff88' }}>{userData.wins}</h5>
                                        <small className="text-white-50">Wins</small>
                                    </div>
                                    <div className="px-3">
                                        <h5 className="mb-0" style={{ color: '#00ff88' }}>{userData.losses}</h5>
                                        <small className="text-white-50">Losses</small>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol lg="8">
                        {/* Details Card */}
                        <MDBCard className="mb-4" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px'
                        }}>
                            <MDBCardBody>
                                <h4 className="mb-4" style={{ color: '#00ff88' }}>Profile Information</h4>
                                
                                {/* Profile Details */}
                                <div className="mb-4">
                                    <p className="text-white-50 mb-1">Email</p>
                                    <h6 className="text-white">{newUser.email}</h6>
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-white-50 mb-1">Location</p>
                                    <h6 className="text-white">Uttar Pradesh, India</h6>
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-white-50 mb-1">Joined</p>
                                    <h6 className="text-white">January 2025</h6>
                                </div>

                                {/* Game Statistics */}
                                <h4 className="mb-4 mt-5" style={{ color: '#00ff88' }}>Game Statistics</h4>
                                <MDBRow>
                                    <MDBCol md="6" className="mb-4">
                                        <div className="p-4" style={{
                                            background: 'rgba(0, 255, 136, 0.1)',
                                            borderRadius: '15px'
                                        }}>
                                            <h6 className="text-white-50">Highest WPM</h6>
                                            <h2 className="text-white">{userData.maxWPM}</h2>
                                            <p className="text-white-50 mb-0">Your personal best</p>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6" className="mb-4">
                                        <div className="p-4" style={{
                                            background: 'rgba(0, 255, 136, 0.1)',
                                            borderRadius: '15px'
                                        }}>
                                            <h6 className="text-white-50">Win Rate</h6>
                                            <h2 className="text-white">{winRate}%</h2>
                                            <p className="text-white-50 mb-0">
                                                {userData.wins} wins out of {totalGames} games
                                            </p>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
