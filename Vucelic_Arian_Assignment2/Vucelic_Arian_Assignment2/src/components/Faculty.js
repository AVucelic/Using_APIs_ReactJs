/**
 * class faculty that displays faculty members
 */
import React from "react";
import axios from 'axios';
import loading from "./gears.gif";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import "./Faculty.css";

class Faculty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facultyMembers: [],
      loadingFaculty: true,
      selectedMemberIndex: null,
      isMobile: false
    };
  }

  componentDidMount() {
    this.fetchFacultyMembers();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }


  fetchFacultyMembers = async () => {
    try {
      const response = await axios.get(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/faculty`
      );
      const data = response.data;
      const facultyM = data.faculty.slice(0, 34);
      this.setState({
        facultyMembers: facultyM,
        loadingFaculty: false,
      });
    } catch (error) {
      console.error("Error fetching faculty members:", error);
      this.setState({ loadingFaculty: false });
    }
  };

  /**
   * Method for reading more about faculty member
   * @param {*} index 
   */
  readMore = (index) => {
    this.setState({ selectedMemberIndex: index });
  };

  /**
   * method for closing that dialog
   */
  closeReadMore = () => {
    this.setState({ selectedMemberIndex: null });
  };

  /**
   * Displays the data
   * @returns 
   */
  render() {
    const { facultyMembers, loadingFaculty, selectedMemberIndex, isMobile } = this.state;

    return (
      <div className="faculty-container">
        <h1 className="styledHeader">Faculty Members</h1>
        {loadingFaculty ? (
          <div className="loading-container">
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <>
            <ImageList
              className="ImageList-root"
              cols={isMobile ? 2 : 5}
              rowHeight={isMobile ? 200 : 300}
              gap={20}
            >
              {facultyMembers.map((member, index) => (
                <ImageListItem key={index} onClick={() => this.readMore(index)} className="ImageListItem">
                  <img
                    src={member.imagePath}
                    alt={member.name}
                    loading="lazy"
                    className="list-image"
                  />
                  <ImageListItemBar
                    title={member.name}
                    subtitle={member.title}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}

        <Dialog open={selectedMemberIndex !== null} onClose={this.closeReadMore}>
          <DialogTitle>{selectedMemberIndex !== null && facultyMembers[selectedMemberIndex].name}</DialogTitle>
          <DialogContent>
            {selectedMemberIndex !== null && (
              <>
                <p>Title: {facultyMembers[selectedMemberIndex].title}</p>
              <p>Interest Area: {facultyMembers[selectedMemberIndex].interestArea}</p>
              <p>Office: {facultyMembers[selectedMemberIndex].office}</p>
              <p>Website: {facultyMembers[selectedMemberIndex].website}</p>
              <p>Phone: {facultyMembers[selectedMemberIndex].phone}</p>
              <p>Email: {facultyMembers[selectedMemberIndex].email}</p>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeReadMore} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Faculty;
