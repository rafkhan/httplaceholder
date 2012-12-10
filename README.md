#HTTPlaceHolder
This Node.js server accepts HTTP requests with the paramaters `w` and `h`, width and height, respectively. It returns a PNG with those dimensions.

##Installation
`sudo npm install -g httplaceholder`

##Starting the Server

`httplace <port> <foreground> <background>`

Foreground and background are optional. They're there to serve as default values if the HTTP request doesn't specify any colours. The defaults are #000, and #DDD.


##Get Your Free PNG!
Get the image by making a request to:

`http://localhost:port?w=x&h=y&fg=c1&bg=c2`
<table>
 <tr>
  <td colspan='2'>
   <b>Parameter</b>
  </td>
  <td><b>Type</b></td>
 </tr>
 <tr>
  <td>w</td><td>Width</td><td>Integer</td>
</tr> 
<tr>
  <td>h</td><td>Height</td><td>Integer</td>
 </tr> 
<tr>
  <td>fg</td><td>Foreground</td><td>Colour</td>
 </tr>
 <tr>
  <td>bg</td><td>Background</td><td>Colour</td>
 </tr>
</table>

###Colours
They **must** be in the proper format. Here are some examples:

 - FFF
 - FFFFFF
 - rgb(0,0,255)
 - rgba(0,0,0,1)
 - rgba(0,0,0,0.75)

**NOTE**: There is no `#` in the hex values in the URL

Here are the regular expressions used to check for RBG(A) values, if you want to be sure your values work:

`^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$`

`^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0((\.[0-9]+)?)|1)\)$`

#Contributions
Are very much appreciated :) <3

I'd love to make this as robust and user friendly as possible.

