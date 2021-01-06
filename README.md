# IT-a
## Assessment Artifact for Imersive Technologies

a) Augmented Reality Points of Interest Application. Develop a mobile AR web app which will download OpenStreetMap 
(OSM) Points Of Interest (POIs) from a GeoJSON-based web API (the API URL and specification will be given to you 
in class). The application should show, in augmented reality, POIs as three-dimensional models. Each POI type 
(e.g. restaurant, pub, cafe) should be shown ideally as a 3D model (a different model for each POI type), 
or if not, a 3D geometry with different colours for different POI types. The POI name and some information 
about the POI must be shown, ideally in a sophisticated way (e.g. a virtual noticeboard) but at the very least,
 as simple text. For a more advanced answer, clicking on the POI text should lead to the POI’s website,
  if available via the API. Some of the more advanced aspects will require further research.

The application should show your latitude and longitude. A more advanced answer will also show altitude,in metres,
 sourced from an API (details will be given in class), and set the y-coordinate of each POI model to the 
 elevation of that POI in metres (calculated from a Digital Elevation Model – this will require further research)

TODO:

- change primitive forms to 3D models -- DONE
- install service workers  -- DONE
- use scheme for universal variables  -- DONE
- make a progressive web app  -- DONE
- how to add color to obj model - edit material file directly -- DONE
- where is the link in the objects? - website inside of the properties -- DONE
- add virtual noticeboard to POI's  -- DONE
- use indedexedDB -- TODO