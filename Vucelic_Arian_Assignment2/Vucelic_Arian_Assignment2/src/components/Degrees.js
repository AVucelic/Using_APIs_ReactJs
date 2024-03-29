/**
 * Class that displays undergraduate and graduate degrees, as well as certificates
 */
import React, { Component } from 'react';
import axios from 'axios';
import loading from "./gears.gif";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import './Degrees.css';

class Degrees extends Component {
  /**
   * Constructor that has array of undergraduate and graduate degrees, and booleans loading and dialog
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      undergraduateDegrees: [],
      graduateDegrees: [],
      loadingDegrees: true,
      selectedDegree: null,
      popUp: false
    };
    this.dialogRef = React.createRef();
  }

  componentDidMount() {
    this.fetchDegrees();
  }

/**
 * Method used to fetch data about undergraduate and graduate degrees from API
 */
  fetchDegrees = async () => {
    try {
      const [undergrad, grad] = await Promise.all([
        axios.get(`https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate`),
        axios.get(`https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/graduate`)
      ]);
      const undergradData = undergrad.data;
      const gradData = grad.data;

      const undergradDegree = undergradData.undergraduate.slice(0, 3);
      const graduateDegrees = gradData.graduate.filter(degree => degree.degreeName !== 'graduate advanced certificates');

      const certificates = gradData.graduate.find(degree => degree.degreeName === 'graduate advanced certificates');
      if (certificates) {
        graduateDegrees.push(certificates);
      }

      this.setState({
        undergraduateDegrees: undergradDegree,
        graduateDegrees: graduateDegrees,
        loadingDegrees: false,
      });
    } catch (error) {
      console.error("Error fetching degrees:", error);
      this.setState({ loadingDegrees: false });
    }
  };

  /**
   * opens popUp window for addition info
   * @param {*} degree 
   */
  popUpOpen = (degree) => {
    this.setState({ selectedDegree: degree, popUp: true });
  };

  /**
   * closes popUp window for addition info
   * @param {*} degree 
   */
  popUpClose = () => {
    this.setState({ selectedDegree: null, popUp: false });
  };

  /**
   * Displays the data
   * @returns 
   */
  render() {
    const { undergraduateDegrees, graduateDegrees, loadingDegrees, selectedDegree, popUp } = this.state;
    return (
      <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ flexGrow: 1 }} >
        {loadingDegrees ? (
          <Grid item xs={12}>
            <div>
              <img src={loading} alt="loading" className="loading-spinner" />
            </div>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="black" className="bold-typography">Undergraduate Degrees</Typography>
            </Grid>
            {undergraduateDegrees.map((degree, index) => (
              <Grid item xs={4} sm={4} md={4} lg={12} key={index} className="card-container">
                <Card className="card">
                  <CardContent className="limited-content">
                    <Typography variant="h6" className="bold-typography" component="div">
                      {degree.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {degree.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ textAlign: 'center' }}>
                    <Button size="small" className="custom-button" onClick={() => this.popUpOpen(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="black" className="bold-typography">Graduate Degrees</Typography>
            </Grid>
            {graduateDegrees.map((degree, index) => (
              <Grid item xs={6} sm={3} md={3} lg={6} key={index} className="card-container">
                <Card className="card">
                  <CardContent className="limited-content">
                    <Typography variant="h6" className="bold-typography" component="div">
                      {degree.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {degree.description}
                    </Typography>
                    {degree.degreeName === "graduate advanced certificates" && (
                      <>
                        <Typography variant="h6" className="bold-typography" component="div">
                          Available Certificates:
                        </Typography>
                        {degree.availableCertificates && degree.availableCertificates.map((certificate, idx) => (
                          <Typography key={idx} variant="body2" color="text.secondary">
                            {certificate}
                          </Typography>
                        ))}
                      </>
                    )}
                  </CardContent>
                  <CardActions sx={{ textAlign: 'center' }}>
                    {degree.degreeName !== "graduate advanced certificates" && (
                      <Button size="small" className="custom-button" onClick={() => this.popUpOpen(degree)}>Learn More</Button>
                      )}
                      {degree.degreeName === "graduate advanced certificates" && (
                        <Button size="small" className="custom-button" onClick={() => this.popUpOpen(degree)}>
                          {popUp && selectedDegree === degree ? 'Hide Certificates' : 'Show Certificates'}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </>
          )}
  
          <Dialog
            onClose={this.popUpClose}
            aria-labelledby="customized-dialog-title"
            open={popUp}
          >
            <DialogTitle id="customized-dialog-title" className="dialog-title">
              {selectedDegree && selectedDegree.title} Concentrations
            </DialogTitle>
            <DialogContent className="dialog-content">
              {selectedDegree && selectedDegree.concentrations && selectedDegree.concentrations.map((concentration, index) => (
                <Typography key={index} gutterBottom>{concentration}</Typography>
              ))}
              {selectedDegree && selectedDegree.availableCertificates && selectedDegree.availableCertificates.map((certificate, idx) => (
                <Typography key={idx} gutterBottom>{certificate}</Typography>
              ))}
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button autoFocus onClick={this.popUpClose} className="dialog-action-button">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      );
    }
  }
  
  export default Degrees;
  
