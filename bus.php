<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <!-- defines the default zoom for mobile devices -->
  <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
  <link rel="stylesheet" href="css/common.css"/>

  <!-- Tell search engines to use the HTTPS version of our website -->
  <link rel="canonical" href="https://lmreppen.github.io/Bachelorgruppe15/" />

  <!-- Main JavaScript file -->
  <script src="js/script.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <title>BusBuddy</title>

  <!-- jQuery 1.12.0 -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

  <!-- jQuery loadTemplate 1.44 -->
  <script type="text/javascript" src="js/jquery.loadTemplate-1.4.4.js"></script>

  <!-- Fetch data js file -->
  <script type="text/javascript" src="js/controller_VM.js" ></script>

  <!-- Jquery url parser -->
  <script type="text/javascript" src="js/purl.js"></script>


  <?php
  $id = $_GET['id'];
  ?>

  <script>
  var busID = <?php echo json_encode($id); ?>
  </script>



</head>

<body>
  <header>
    <div id="banner" role="banner">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-2"><span class="glyphicon glyphicon-map-marker" id="mapmarker"></span></div>
          <div class="col-xs-4"><h4>Du er her:</h4></div>
          <div class="col-xs-5"><a href="#" id="herErDu"></a></div>
        </div>
      </div>
    </header>

    <div class="container wrapper" id="search">
      <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-8"><form class="form-horizontal" role="search">
          <input type="text" class="form-control" placeholder="Holdeplass">
        </div>
        <div class="col-xs-1">
          <a href="#" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-search"></span> Søk</a></div>
            <div class="col-xs-1"></div>
          </div>
        </div>

         <div class="container-fluid" id="timetable">
            <button type="button" id="stoppKnapp1" class="btn btn-xs btn-default btn-primary" onClick="connect()" >Connect to beacon</button>
          </div>


        <div class="container" id="timetableHeader">
          <div class="row" id="infoTekst">
            <div class="col-xs-6">
              <p>Buss</p>
            </div>
            <div class="col-xs-6">
              <p>Tid</p>
            </div>
          </div>
        </div>

        <div class="container-fluid" id="timetable">
          <div class="simple-template-container">
            <!-- dynamically generated content from template is placed here -->

          </div>
        </div>
      </div>

      <div class="container footer" id="footer">
              <div class="row">
                <div class="col-xs-4 col-md-4" id="sanntid" height="100px"><a href="index.php?id=16010404"><span class="glyphicon glyphicon-time lnr"></br><a id="sanntid">Sanntid</a></span></a>
                </a>
              </div>
                <div class="col-xs-4 col-md-4" id="minReise_active"><a href=""><span class="lnr lnr-bus"></br><a>Min reise</a></span></a>
              </div>
                <div class="col-xs-4 col-md-4" id="phWeb"><a href="b"><span><img src="physical_web_logo.png" height="33"></br><a href="#">Physical Web</a></span>
                </a>
              </div>
              </div>
            </div>

      <!-- Template -->
      <script type="text/html" id="template">
      
        <div class="row" id="bussrad">
          <div class="col-xs-2 col-md-1" id="stopButton">
            <button id="stoppknapp" class="btn btn-xs btn-default btn-success">STOPP</button>
          </div>
          <div class="col-xs-1 col-md-3"><p href="#" id="buss" class="busName" data-content="stopName"></p>
          </div>
          <div class="col-xs-3 col-md-3"><p href="#"></p>
          </div>
          <div class="col-xs-4 col-md-3"><canvas class="myCanvas" width="85" height="90"></canvas><h4 href="#" class="closemin" data-content="timeEst"></h4>
          </div>
        </div>
      </script>



    </body>
    <footer id="main-footer">
      <p>
        Bachelorgruppe 15. All rights reserved. Copyright &copy; 2016 - forever.
      </p>
    </footer>
  </body>
</html>
