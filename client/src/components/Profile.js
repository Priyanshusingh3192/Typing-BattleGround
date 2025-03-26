import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                {/* Breadcrumb */}
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href="#">Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="#">User</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                {/* User Profile and Details in Horizontal Alignment */}
                <MDBRow>
                    {/* User Profile Section */}
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '130px' }}
                                    fluid
                                />
                                <p className="text-muted mb-1">Full Stack Developer</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn>Follow</MDBBtn>
                                    <MDBBtn outline className="ms-1">
                                        Message
                                    </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    {/* User Details Section */}
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">Johnathan Smith</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">example@example.com</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                {/* Matches Section */}
                <MDBRow className="mt-4 text-center">
                    <MDBCol lg="12">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <h1 className="text-center mb-4 bg-black text-white " style={{borderRadius:'20px'}}>Matches</h1>
                                <MDBRow className="justify-content-center align-items-center">
                                    {/* Winning Match */}
                                    <MDBCol md="4">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                            alt="Winner"
                                            className="rounded-circle"
                                            style={{ width: '100px', height: '100px', border: '5px solid gold' }}
                                            fluid
                                        />
                                        <MDBCardText className="mt-2 fw-bold">Winner: User 1</MDBCardText>
                                    </MDBCol>

                                    {/* Match 1 */}
                                    <MDBCol md="4">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                            alt="User 2"
                                            className="rounded-circle"
                                            style={{ width: '80px', height: '80px' }}
                                            fluid
                                        />
                                        <MDBCardText className="mt-2">User 2</MDBCardText>
                                    </MDBCol>

                                    {/* Match 2 */}
                                    <MDBCol md="4">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                            alt="User 3"
                                            className="rounded-circle"
                                            style={{ width: '80px', height: '80px' }}
                                            fluid
                                        />
                                        <MDBCardText className="mt-2">User 3</MDBCardText>
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
