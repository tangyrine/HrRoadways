import React, {useEffect} from 'react';

function AboutUs() {
    const pageStyle = {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        color: 'white',  // Default text color set to white
        backgroundColor: '#1d2d44', // Dark navy blue background
        minHeight: '100vh', // Ensure the page covers full screen
        marginTop: '50px',  // Adjusted margin-top for the page itself
    };

    const containerStyle = {
        maxWidth: '1200px',
        marginTop: '70px',  // Added margin-top to create space at the top of the container
        margin: '0 auto',
        backgroundColor: '#1d2d44', // Container matches background color
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)',  // Stronger shadow to make it more visible
    };

    const titleStyle = {
        padding: '20px',
        fontSize: '2.5rem',
        textAlign: 'center',
        color: '#EEEEEE', // Light gray color for the title
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginTop: '20px',
        textAlign: 'center',
        color: 'white',  // Body text remains white
    };

    const sectionTitleStyle = {
        fontSize: '2rem',
        marginTop: '30px',
        color: '#EEEEEE', // Light gray for section titles
    };

    const missionDescriptionStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: 'white',  // Mission description in white
        marginTop: '10px',
    };

    const teamMembersStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
    };

    const teamMemberStyle = {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',  // Slight shadow for team members to make them stand out
        transition: 'transform 0.3s ease-in-out',
    };

    const teamMemberHoverStyle = {
        transform: 'translateY(-10px)',
    };

    const teamImageStyle = {
        width: '150px',
        height: '150px',
        
        borderRadius: '50%',  // Make the images round
        objectFit: 'cover',   // Ensure the images cover the entire circle
    };

    const teamNameStyle = {
        fontSize: '1.5rem',
        color: '#333',
        marginTop: '10px',
    };

    const teamRoleStyle = {
        fontSize: '1rem',
        color: '#777',
        marginTop: '5px',
    };


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>About Us</h1>
                <p style={descriptionStyle}>
                    Welcome to our website! We are a dedicated team focused on providing excellent services to our customers. Our mission is to deliver top-quality products and services that exceed expectations.
                </p>
                <h2 style={sectionTitleStyle}>Our Mission</h2>
                <p style={missionDescriptionStyle}>
                    Our mission is to create innovative solutions that empower our customers. We aim to make a positive impact on the world by offering high-quality services, building trust, and fostering lasting relationships with our clients.
                </p>
                <h2 style={sectionTitleStyle}>Meet Our Team</h2>
                
                {/* Team members section starts */}
                <div style={teamMembersStyle}>
                    {/* Individual team member */}
                    <div style={teamMemberStyle}>
                        <img //this is just an image dont get scared by this green stuff replace it with your image 
                            src="phot1.jpg"
                            alt="team member 1"
                            style={teamImageStyle}
                        />
                        <h3 style={teamNameStyle}>John Doe</h3>
                        <p style={teamRoleStyle}>CEO & Founder</p>
                        {/* End of team member 1 */}
                    </div>

                    {/* Individual team member */}
                    <div style={teamMemberStyle}>
                        <img //add your own image again this is just a demo visual
                            src="data:image/webp;base64,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Qm9vayBzdW1taXQgYXQgSmF6eiBhdCBMaW5jb2xuIENlbnRlciBvbiBEZWNlbWJlciAwNCwgMjAyNCBpbiBOZXcgWW9yayBDaXR5LiBUaGUgTllUIHN1bW1pdCB3aXRoIEFuZHJldyBSb3NzIFNvcmtpbiByZXR1cm5zIHdpdGggaW50ZXJ2aWV3cyBvbiB0aGUgbWFpbiBzdGFnZSBpbmNsdWRpbmcgU2FtIEFsdG1hbiwgY28tZm91bmRlciBhbmQgQy5FLk8uIG9mIE9wZW5BSSwgSmVmZiBCZXpvcywgZm91bmRlciBhbmQgZXhlY3V0aXZlIGNoYWlybWFuIG9mIEFtYXpvbiBhbmQgb3duZXIgb2YgdGhlIFdhc2hpbmd0b24gUG9zdCwgZm9ybWVyIFUuUy4gUHJlc2lkZW50IEJpbGwgQ2xpbnRvbiBhbmQgUHJpbmNlIEhhcnJ5LCBUaGUgRHVrZSBvZiBTdXNzZXgsIGFtb25nIG90aGVycy4gVGhlIGRpc2N1c3Npb25zIHdpbGwgdG91Y2ggb24gdG9waWNzIHN1Y2ggYXMgYnVzaW5lc3MsIHBvbGl0aWNzIGFuZCBjdWx0dXJlLiAoUGhvdG8gYnkgTWljaGFlbCBNLiBTYW50aWFnby9HZXR0eSBJbWFnZXMpMjAyNCBHZXR0eSBJbWFnZXMsAQAAAQAAACwBAAABAAAAWE1QIPEHAABodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgZGM6UmlnaHRzPSIyMDI0IEdldHR5IEltYWdlcyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMjE4ODI2ODE2MiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2V1bGE/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmwiIHBsdXM6RGF0YU1pbmluZz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi92b2NhYi9ETUktUFJPSElCSVRFRC1FWENFUFRTRUFSQ0hFTkdJTkVJTkRFWElORyIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPk1pY2hhZWwgTS4gU2FudGlhZ288L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjxkYzpkZXNjcmlwdGlvbj48cmRmOkFsdD48cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPk5FVyBZT1JLLCBORVcgWU9SSyAtIERFQ0VNQkVSIDA0OiBTdW5kYXIgUGljaGFpLCBDLkUuTy4gb2YgR29vZ2xlIGFuZCBBbHBoYWJldCwgc3BlYWtzIGR1cmluZyB0aGUgTmV3IFlvcmsgVGltZXMgYW5udWFsIERlYWxCb29rIHN1bW1pdCBhdCBKYXp6IGF0IExpbmNvbG4gQ2VudGVyIG9uIERlY2VtYmVyIDA0LCAyMDI0IGluIE5ldyBZb3JrIENpdHkuIFRoZSBOWVQgc3VtbWl0IHdpdGggQW5kcmV3IFJvc3MgU29ya2luIHJldHVybnMgd2l0aCBpbnRlcnZpZXdzIG9uIHRoZSBtYWluIHN0YWdlIGluY2x1ZGluZyBTYW0gQWx0bWFuLCBjby1mb3VuZGVyIGFuZCBDLkUuTy4gb2YgT3BlbkFJLCBKZWZmIEJlem9zLCBmb3VuZGVyIGFuZCBleGVjdXRpdmUgY2hhaXJtYW4gb2YgQW1hem9uIGFuZCBvd25lciBvZiB0aGUgV2FzaGluZ3RvbiBQb3N0LCBmb3JtZXIgVS5TLiBQcmVzaWRlbnQgQmlsbCBDbGludG9uIGFuZCBQcmluY2UgSGFycnksIFRoZSBEdWtlIG9mIFN1c3NleCwgYW1vbmcgb3RoZXJzLiBUaGUgZGlzY3Vzc2lvbnMgd2lsbCB0b3VjaCBvbiB0b3BpY3Mgc3VjaCBhcyBidXNpbmVzcywgcG9saXRpY3MgYW5kIGN1bHR1cmUuIChQaG90byBieSBNaWNoYWVsIE0uIFNhbnRpYWdvL0dldHR5IEltYWdlcyk8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzpkZXNjcmlwdGlvbj4KPHBsdXM6TGljZW5zb3I+PHJkZjpTZXE+PHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+PHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2RldGFpbC8yMTg4MjY4MTYyP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+CgA="
                            alt="Team Member 2"
                            style={teamImageStyle}
                        />
                        <h3 style={teamNameStyle}>Jane Smith</h3>
                        <p style={teamRoleStyle}>Chief Marketing Officer</p>
                        {/* End of team member 2 */}
                    </div>

                    {/* Individual team member */}
                    <div style={teamMemberStyle}>
                        <img
                            src="team-member3.jpg"  // Replace with your actual image path
                            alt="Team Member 3"
                            style={teamImageStyle}
                        />
                        <h3 style={teamNameStyle}>Robert Brown</h3>
                        <p style={teamRoleStyle}>Lead Developer</p>
                        {/* End of team member 3 */}
                    </div>
                </div>
                {/* Team members section ends */}
            </div>
        </div>
    );
}

export default AboutUs;
