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
  <script type="text/javascript" src="js/fetch_data.js" ></script>


  <?php

  $con=mysqli_connect('Localhost', 'root', 'ssfb1992','bluebus');
  mysqli_select_db("holdeplasser",$con);

  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $id = $_GET['id'];
  $sql = "SELECT * FROM holdeplasser where id= $id";
  $result = mysqli_query($con, $sql);
  $row = mysqli_fetch_array($result);
  ?>
  <script>



  var holdeplass = <?php echo json_encode($row["id"]); ?>

  </script>

</head>

<body>
  <header>
    <div id="banner" role="banner">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-2"><span class="glyphicon glyphicon-map-marker" id="mapmarker"></span></div>
          <div class="col-xs-4"><h4>Du er her:</h4></div>
          <div class="col-xs-5"><a href="#" id="herErDu"><?php echo utf8_encode($row["navn"]); ?></a></div>
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
          <div class="col-xs-4 col-md-4"><span class="glyphicon glyphicon-time lnr"></span>
          </div>
          <div class="col-xs-4 col-md-4"><span class="lnr lnr-bus"></span>
          </div>
          <div class="col-xs-4 col-md-4"><span class="glyphicon glyphicon-search lnr"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4 col-md-4"><p href="#">Sanntid</p>
          </div>
          <div class="col-xs-4 col-md-4"><p href="#">Min reise</p>
          </div>
          <div class="col-xs-4 col-md-4"><p href="#">Noe annet</p>
          </div>
        </div>
      </div>

      <!-- Template -->
      <script type="text/html" id="template">
        <div class="row" id="bussrad">
          <div class="col-xs-3 col-md-1"><a href=""><img src="img/stoppknapp.png" height="10" width="20"></a>
          </div>
          <div class="col-xs-1 col-md-2"><h3 href="#" class="lineRef" data-content="lineRef"></h3>
          </div>
          <div class="col-xs-1 col-md-3"><p href="#" id="buss" class="busName" data-content="busName"></p>
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
