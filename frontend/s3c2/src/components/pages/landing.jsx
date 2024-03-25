import axios from 'axios'
import React,  { useEffect, useState } from 'react';
import Map from "../../components/Map/Map";

const LandingPage = () => {
  
  const [formData, setFormData] = useState('');
  const [rout, setrout] = useState('');
  const [dis, setdis] = useState('');

  const [algorithm, setAlgorithm] = useState('');
  const [startCity, setStartCity] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const form = new FormData();
    form.append('file', file);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer VOTRE_JETON'
    };

    axios.post('http://127.0.0.1:8000/upload/', form, { headers })
      .then(response => {
        console.log('Réponse de l\'API :', response.data);
        setFormData(response.data.cities);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }

  const city = (event) => {
    setStartCity(event.target.value);
  }

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  }

  const handleAlgorithmSelection = async() => {
    if (algorithm) {
      switch (algorithm) {
        case 'approximation':
          await proximation();
          break;
        case 'aco':
          await handleACO();
          break;
        case 'kmeans':
          handleKMeans();
          break;
        default:
          console.log("Invalid algorithm selected");
      }
    } else {
      setError("Veuillez sélectionner un algorithme.");
    }
  }

  const handleACO = async() => {
    console.log("Ant Colony Optimization (ACO) selected");
    if (startCity && formData) {
      console.log(formData,startCity)

      const requestData = {
        cities:formData,
        start_city:startCity
      };

       
      axios.post('http://127.0.0.1:8000/tsp-solution/', requestData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Réponse de l\'API ACO :', response.data);
        setrout(response.data.path);
        setdis(response.data.total_distance)
    })
    .catch(error => {
        if (error.response) {
            // La requête a été reçue, mais le serveur a renvoyé un code d'erreur
            console.error('Erreur de réponse du serveur :', error.response.data);
        } else if (error.request) {
            // La requête n'a pas été reçue par le serveur
            console.error('Erreur de requête :', error.request);
        } else {
            // Une autre erreur s'est produite
            console.error('Erreur inattendue :', error.message);
        }
    });
      
    } else {
      console.log('Veuillez sélectionner une ville de départ et télécharger les données avant de continuer.');
    }
  }
  const proximation = async() => {
    console.log("Ant Colony Optimization (ACO) selected");
    if (startCity && formData) {
      console.log(formData,startCity)

      const requestData = {
        cities:formData,
        start_city:startCity
      };

       
      axios.post('http://127.0.0.1:8000/ant-system-solution/', requestData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Réponse de l\'API ACO :', response.data)
        setrout(response.data.path);
        setdis(response.data.total_distance)
    })
    .catch(error => {
        if (error.response) {
            // La requête a été reçue, mais le serveur a renvoyé un code d'erreur
            console.error('Erreur de réponse du serveur :', error.response.data);
        } else if (error.request) {
            // La requête n'a pas été reçue par le serveur
            console.error('Erreur de requête :', error.request);
        } else {
            // Une autre erreur s'est produite
            console.error('Erreur inattendue :', error.message);
        }
    });
      
    } else {
      console.log('Veuillez sélectionner une ville de départ et télécharger les données avant de continuer.');
    }
  }


  const handleKMeans = () => {
    console.log("Ant colony optimization using clustering k-means selected");
  }
  
  
  return (
    <div>
      <nav className="navbar  bg-light navbar-expand-lg py-lg-3 navbar-dark">
        <div className="container">
          <a href="index.html" className="navbar-brand me-lg-5">
            <img
              src="assets/images/tsp-logo.png"
              alt=""
              className=" logo-custom"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav  me-auto align-items-center">
              <li className="nav-item mx-lg-1">
                <a className="nav-link  text-secondary active" href="">
                  Home
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  About TSP
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  Ai chatbot
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-0">
                <img
                  src="assets/images/chatbot.png"
                  alt=""
                  className="logo-dark logo-custom"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="hero-section bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="mt-md-4">
                <div>
                  <span className="badge bg-danger rounded-pill">TSP</span>
                  <span id="transformTarget" className="gradient-title ms-1">
                    <strong>Problem Server</strong>
                  </span>
                </div>
                <h2 className="text-coolors-3  fw-normal mb-4 mt-3 hero-title">
                  <strong> Optimize Your Journey Across Mauritania</strong>
                </h2>
                <p className="mb-4 font-16 text-coolors-1 ">
                  Find the most efficient route through Mauritania's landmarks.
                  Whether you're planning a trip or optimizing logistics, our
                  tool leverages cutting-edge algorithms to map out the shortest
                  path starting and ending in Nouakchott.
                </p>
                <a href="" target="_blank" className="btn btn-success">
                  Preview <i className="mdi mdi-arrow-right ms-1" />
                </a>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="text-md-end mt-3 mt-md-0">
                <img src="assets/images/tsp.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 ">
        <div className="container">
          <div className="row py-4 ">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0">
                  <i className="mdi mdi-infinity" />
                </h1>
                <h3>
                  Start Your <span className="text-primary"> Mauritanian</span>
                  Tour
                </h3>
                <div className="col-xl-6">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div id="progressbarwizard">
                          <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                            <li className="nav-item ">
                              <a
                                href="#account-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <i className="mdi mdi-account-circle me-1" />
                                <span className="d-none d-sm-inline">
                                  Upload File
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#profile-tab-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <span className=" uil-circuit me-1" />
                                <span className="d-none d-sm-inline">
                                  Choose Algorithm
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#finish-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <i className="mdi mdi-checkbox-marked-circle-outline me-1" />
                                <span className="d-none d-sm-inline">
                                  Finish
                                </span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content b-0 mb-0">
                            <div
                              id="bar"
                              className="progress mb-3"
                              style={{ height: 7 }}
                            >
                              <div className="bar progress-bar progress-bar-striped progress-bar-animated bg-success"></div>
                            </div>
                            <div className="tab-pane" id="account-2">
                              <div className="row">
                              <div className="row">
                              <div className="col-md-6">
                                  <label className="form-label">From where</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      defaultValue="Nouakchott"
                                      onChange={city}
                                  />
                              </div>
                                  <div className="row mb-3">
                                    
                                    <div className="col-md-3">
                                      <div className="ms-3">
                                     
                                        <label htmlFor="file-upload" className="btn btn-success btn-sm mt-2">
                                            <span className="d-none d-sm-inline">Upload File</span>
                                          </label>
                                          <input
                                            id="file-upload"
                                            type="file"
                                            className="d-none"
                                            onChange={handleFileUpload}
                                          />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane" id="profile-tab-2">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                              <div className="row">
                                <div className="mb-3">
                                  <label htmlFor="example-select" className="form-label">Choisir un algorithme</label>
                                  <select className="form-select" id="example-select" onChange={handleAlgorithmChange}>
                                    <option value="">Sélectionnez un algorithme</option>
                                    <option value="approximation">algorithme d'approximation</option>
                                    <option value="aco">Algorithme d'ACO</option>
                                    <option value="kmeans">Avec clustering</option>
                                  </select>
                                </div>
                                
                              </div>
                            </div>

                            <div className="tab-pane" id="finish-2">
                              <div className="row">
                                <div className="col-12">
                                  <div className="text-center">
                                    <h2 className="mt-0">
                                      <i className="mdi mdi-check-all" />
                                    </h2>
                                    <h3 className="mt-0">
                                      All Set and Ready to Go! !
                                    </h3>
                                    <p className="w-75 mb-2 mx-auto">
                                      Thank you for completing the setup! Your
                                      files have been successfully uploaded and
                                      the optimal route calculation is complete.
                                    </p>
                                    <div className="mb-3">
                                      <div className="form-check d-inline-block">
                                        
                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ul className="list-inline mb-0 wizard  d-flex justify-content-between">
                              <li className="previous list-inline-item float-left">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-info "
                                >
                                  Previous
                                </a>
                              </li>
                              <li className="next list-inline-item float-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-info"
                                  onClick={algorithm ? handleAlgorithmSelection : undefined}
                                >
                                  Next
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                
                      </form>
                    </div>
                    
                  </div>
                </div>
                {rout &&
            <div className="col-lg-12">
              <div className="text-center">
              <h1>City Map</h1>
               <CityMap path={rout} totalDistance={dis} />
               <Map path={rout} totalDistance={dis} />
                </div></div>}
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      
      
      
      <footer className="bg-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="assets/images/tsp-logo.png"
                alt=""
                className="logo-dark"
                height={18}
              />
              <p className="text-muted mt-4">
                Hyper makes it easier to build better websites with
                <br /> great speed. Save hundreds of hours of design
                <br /> and development by using it.
              </p>
              <ul className="social-list list-inline mt-3">
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-primary text-primary"
                  >
                    <i className="mdi mdi-facebook" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-danger text-danger"
                  >
                    <i className="mdi mdi-google" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-info text-info"
                  >
                    <i className="mdi mdi-twitter" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-secondary text-secondary"
                  >
                    <i className="mdi mdi-github" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Company</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    About Us
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Documentation
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Blog
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Apps</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Ecommerce Pages
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Email
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Social Feed
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Projects
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Tasks Management
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Discover</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Help Center
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Our Products
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-5">
                <p className="text-muted mt-4 text-center mb-0">
                  © 2024 - 2025 Hyper. Design and coded by Let's code
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  function CityMap({ path, totalDistance }) {
    useEffect(() => {
      drawMap();
    }, [path]);
  
    function drawMap() {
      const canvas = document.getElementById('mapCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
  
      // Dessinez les lignes reliant les villes
      for (let i = 0; i < path.length - 1; i++) {
        const city1 = path[i];
        const city2 = path[i + 1];
        ctx.beginPath();
        ctx.moveTo(i * 50, 100);
        ctx.lineTo((i + 1) * 50, 100);
        ctx.stroke();
        ctx.fillText(city1, i * 50, 80);
      }
  
      // Affichez la dernière ville
      ctx.fillText(path[path.length - 1], (path.length - 1) * 50, 80);
    }
    return (
      <div>
        <canvas id="mapCanvas" width={path.length * 50} height={200}></canvas>
        <p>Total Distance: {totalDistance} km</p>
      </div>
    );
  }
};
export default LandingPage;
