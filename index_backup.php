<?php 
		$ID=$_GET['ID']; 
		$nID=$_GET['newsID']; 
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <title>Artifact Design</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <script type="text/javascript" src="js/swfobject.js"></script>
 
    <script type="text/javascript">
		var flashvars = {
			<?php if ($_GET['ID']){ ?>
			aID: "<? echo $ID; ?>",
			<?php } else { ?>
			aID: "0",
			<?php } ?>
			<?php if ($_GET['newsID']){ ?>
			nID: "<? echo $nID; ?>"
			<?php } else { ?>
			nID: "0"
			<?php } ?>
		};
		var params = {
		  scale: "noScale",
		  bgcolor: "000000"
		};
		var attributes = false;
		
		swfobject.embedSWF("swf/shell2.swf", "swf", "100%", "100%", "9.0.0","swf/expressInstall.swf", flashvars, params, attributes);
	</script>
    <script language="JavaScript">
		<!--
		// This will resize the window when it is opened or
		// refresh/reload is clicked to a width and height of 500 x 500
		// with is placed first, height is placed second
		window.resizeTo(1100,840)
		-->
	</script>

    <style type="text/css" media="screen">
	  html, body { height:100%; color:#CCCCCC; }
	  body { margin:0; padding:0; overflow:hidden; background-color:#000000; }
	</style>
  </head>
  <body>
    <div id="swf" style="height:100%" >
        <div style="color:#CCCCCC; font-size:80%; font-family:Arial, Helvetica, sans-serif;">
          <img src="battery.gif" border="0">
          <h1>Thanks for stopping by.</h1>
          <p>Artifact is an award-winning 2D and 3D design studio based in Atlanta and LA. We create ground-breaking, envelope-pushing, on-target design and animation for advertising agencies, production companies, and tv networks.</p>
          <p>To experience our website, please <a href="http://get.adobe.com/flashplayer/" target="_blank">click here</a> to install the latest version of the Flash Player plug-in.</p>
          <p>LA
          <br />1506 ABBOT KINNEY BLVD.
          <br />VENICE, CA 90291
          <br>VOICE  310 745 9055  
          <br>FAX  310 452 0850
          </p>
          <p>
          <br>ATL
          <br>455 GLEN IRIS DR NE
          <br>STUDIO F
          <br>ATLANTA, GA 30308   
          <br>VOICE  404 888 0061   
          <br>FAX  404 888 0062  
          </p>

        </div>
    </div>

  
  </body>
</html>