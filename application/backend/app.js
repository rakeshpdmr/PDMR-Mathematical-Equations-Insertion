const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const mjAPI = require("mathjax-node");
const fs = require("fs");

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Configuration options for mathjax-node
mjAPI.config({
  MathJax: {
    SVG: {
      font: "TeX",
      linebreaks: { automatic: true },
    },
  },
});

// Start mathjax-node
mjAPI.start();

// Handle LaTeX equation conversion request
app.post("/convert/latex-to-wmf", (req, res) => {
  const latexEquation = req.body.latexEquation;

  // Typeset the LaTeX equation into SVG
  mjAPI.typeset(
    {
      math: latexEquation,
      format: "TeX",
      svg: true,
    },
    (data) => {
      if (!data.errors) {
        // Save SVG data to a file
        const svgFilePath = "svgInput.svg";
        const pngFilePath = "pngInput.png";
        const outputFilePath = "output.wmf";

        fs.writeFileSync(svgFilePath, data.svg);

        // Convert SVG to WMF using ImageMagick
        const convertPath = "ImageMagick-7.1.1-Q16-HDRI/convert.exe";

        exec(
          `"${convertPath}" ${svgFilePath} ${pngFilePath}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Error converting SVG to WMF: ${error.message}`);
              res.status(500).send("Internal server error");
              return;
            }
            if (stderr) {
              console.error(`Conversion warning: ${stderr}`);
            }

            exec(
              `"${convertPath}" ${pngFilePath} ${outputFilePath}`,
              (error, stdout, stderr) => {
                if (error) {
                  console.error(
                    `Error converting SVG to WMF: ${error.message}`
                  );
                  res.status(500).send("Internal server error");
                  return;
                }
                if (stderr) {
                  console.error(`Conversion warning: ${stderr}`);
                }

                // Read the converted WMF file
                const wmfBuffer = fs.readFileSync(outputFilePath);

                // Send WMF file back to client
                res.set("Content-Type", "image/wmf");
                res.set(
                  "Content-Disposition",
                  'attachment; filename="converted.wmf"'
                );
                res.send(wmfBuffer);

                // Delete temporary files
                fs.unlinkSync(svgFilePath);
                fs.unlinkSync(pngFilePath);
                fs.unlinkSync(outputFilePath);
              }
            );
          }
        );
      } else {
        console.error("Error:", data.errors);
        res.status(400).send("Error converting LaTeX equation");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/*
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const multer = require("multer");
const bodyParser = require("body-parser");
const wmf = require("wmf");
// const fs = require("fs");
const mathjax = require("mathjax-node-svg2img");
const path = require("path");
const { exec } = require("child_process");
const katex = require("katex");
const puppeteer = require("puppeteer-core");
const { SVGtoCanvas } = require("canvg");
// const { JSDOM } = require("jsdom");
// const { SVGtoWMF } = require("svg2wmf");

const mjAPI = require("mathjax-node");
const fs = require("fs");
*/

/*
const mjAPI = require("mathjax-node");

// Configuration options for mathjax-node
mjAPI.config({
  MathJax: {
    // Choose the output format: SVG or PNG
    SVG: {
      font: "TeX",
      linebreaks: { automatic: true },
    },
  },
});

// Typeset the LaTeX equation into SVG
mjAPI.start();
const equation = "\\int_{0}^{1} x^2 dx";
mjAPI.typeset(
  {
    math: equation,
    format: "TeX", // Input format is LaTeX
    svg: true, // Output format is SVG
  },
  (data) => {
    if (!data.errors) {
      console.log(data.svg);
    } else {
      console.error("Error:", data.errors);
    }
  }
);

*/

/*
// Handle file upload
app.post("/convert/blob-to-wmf", (req, res) => {
  console.log(" latex equation is ", req.body);
  const latexEquation = req.body.latexEquation;

  // Render LaTeX equation to SVG using KaTeX (this is just a placeholder)
  const svgData = renderLatexToSvg(latexEquation);

  const inputFilePath = "search.png";
  const outputFilePath = "output.wmf";
  // const convertPath =
  //   "C:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI\\convert.exe";

  const convertPath = "ImageMagick-7.1.1-Q16-HDRI\\convert.exe";

  // Execute the convert command
  exec(
    `"${convertPath}" ${inputFilePath} ${outputFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Conversion successful!`);

      // Read the converted WMF file
      const wmfBuffer = fs.readFileSync("output.wmf");

      // Send WMF file back to client
      res.set("Content-Type", "image/wmf");
      res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
      res.send(wmfBuffer);
    }
  );
});
*/

/*
function renderLatexToSvg(latexEquation) {
  try {
    const svg = katex.renderToString(latexEquation, {
      throwOnError: false, // Set to true if you want to throw an error on invalid LaTeX
      displayMode: false, // Set to true for display mode (centered equations)
      output: "svg", // Output format
    });
    return svg;
  } catch (error) {
    console.error("Error rendering LaTeX to SVG:", error);
    return null;
  }
}
*/

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

// const pngToWmf = require("png-to-wmf");

/*
const inputFilePath = "input.png";
const outputFilePath = "output.wmf";

// Execute the convert command
exec(`convert ${inputFilePath} ${outputFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Conversion successful!`);
});
*/

// const { exec } = require("child_process");

/*
const inputFilePath = "input.png";
const intermediateFilePath = "intermediate.bmp";
const outputFilePath = "output.wmf";

// Execute the convert command to convert PNG to BMP
exec(
  `convert ${inputFilePath} ${intermediateFilePath}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    // Execute the command to convert BMP to WMF
    exec(
      `bmptowmf ${intermediateFilePath} ${outputFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error: ${stderr}`);
          return;
        }
        console.log(`Conversion successful!`);
      }
    );
  }
);
*/
// const { exec } = require("child_process");

// const inputFilePath = "input.png";
// const outputFilePath = "output.wmf";

// fs.readFile(inputFilePath, (err, data) => {
//   if (err) throw err;
//   pngToWmf(data, (err, wmfBuffer) => {
//     if (err) throw err;
//     fs.writeFile(outputFilePath, wmfBuffer, (err) => {
//       if (err) throw err;
//       console.log("Conversion successful!");
//     });
//   });
// });

/*
// Function to render LaTeX equation using MathJax
async function renderLatexToSVG(latex) {
  const jsdom = new JSDOM(`<!DOCTYPE html><div id="equation"></div>`);
  const { window } = jsdom;

  global.document = window.document;

  // Load MathJax
  const MathJax = await require("mathjax").init({
    loader: { load: ["input/tex", "output/svg"] },
    tex: { packages: { "[+]": ["amsmath"] } },
  });

  // Typeset LaTeX equation
  const svg = await MathJax.typeset({
    math: latex,
    format: "TeX",
    svg: true,
  });

  return svg;
}

// Function to convert SVG to WMF
function convertSVGtoWMF(svg, outputPath) {
  const wmfBuffer = SVGtoWMF(svg);
  fs.writeFileSync(outputPath, wmfBuffer);
  console.log(`WMF file generated at ${outputPath}`);
}

// Usage
const latexEquation = "E=mc^2"; // Your LaTeX equation
const wmfFilePath = "equation.wmf"; // Path to save WMF file

renderLatexToSVG(latexEquation)
  .then((svg) => convertSVGtoWMF(svg, wmfFilePath))
  .catch((err) => console.error(err));
const app = express();
const port = 3000;
 */
/*
// Function to render LaTeX equation using MathJax and save as SVG
function renderLatexToSVG(latex, outputPath) {
  mathjax.typeset(
    {
      math: latex,
      format: "TeX",
      svg: true,
    },
    (data) => {
      if (!data.errors) {
        fs.writeFileSync(outputPath, data.svg);
        console.log(`SVG file generated at ${outputPath}`);
        convertSVGtoWMF(outputPath, "equation.wmf");
      } else {
        console.error(`Error: ${data.errors}`);
      }
    }
  );
}

// Function to convert SVG to WMF using the wmf library
function convertSVGtoWMF(inputPath, outputPath) {
  const svgData = fs.readFileSync(inputPath, "utf8");
  const wmfBuffer = wmf(svgData);
  fs.writeFileSync(outputPath, wmfBuffer);
  console.log(`WMF file generated at ${outputPath}`);
}

// Usage
const latexEquation = "E=mc^2"; // Your LaTeX equation
const svgFilePath = "equation.svg"; // Path to save SVG file

renderLatexToSVG(latexEquation, svgFilePath);
*/
// Enable CORS for all routes
// app.use(cors());

// Use body-parser middleware to parse JSON requests
// app.use(bodyParser.json());

/*

// Define the path to the Chrome executable
const chromeExecutablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Handle file upload and conversion
app.post("/convert/latex-to-wmf", async (req, res) => {
  console.log("SVGtoCanvas ", SVGtoCanvas);
  const latexEquation = req.body.latexEquation;

  if (!latexEquation) {
    return res.status(400).send("No LaTeX equation provided");
  }

  const wmfData = await katex.renderToString(latexEquation, { format: "svg" });

  console.log("wmf data ", wmfData);

  // Option 2: Return the WMF data as base64 for client-side conversion (less recommended due to limitations)
  const base64Data = Buffer.from(wmfData).toString("base64");

  console.log(" base64Data ", base64Data);
  res.send({ data: base64Data });

  */

// Save LaTeX equation to a temporary SVG file
// const svgPath = path.join(__dirname, "temp_equation.svg");
// let wmfPath = "";
// fs.writeFileSync(svgPath, latexEquation);

// try {
//   // Convert SVG to WMF using canvg and puppeteer
//   const browser = await puppeteer.launch({
//     executablePath: chromeExecutablePath,
//     headless: true,
//   });
//   const page = await browser.newPage();
//   await page.setContent(
//     '<canvas id="canvas" width="800" height="600"></canvas>'
//   );
//   const canvas = await page.$("canvas");
//   await SVGtoCanvas(canvas, fs.readFileSync(svgPath, "utf-8"));
//   const wmfDataUrl = await page.evaluate(() => {
//     const canvas = document.getElementById("canvas");
//     return canvas.toDataURL("image/wmf");
//   });
//   const wmfData = Buffer.from(wmfDataUrl.split(",")[1], "base64");
//   wmfPath = path.join(__dirname, "converted_equation.wmf");
//   fs.writeFileSync(wmfPath, wmfData);
//   await browser.close();

//   // Send WMF file back to client
//   res.set("Content-Type", "image/wmf");
//   res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
//   res.send(wmfData);
// } catch (error) {
//   console.error(`Error converting SVG to WMF: ${error.message}`);
//   return res.status(500).send("Internal server error");
// } finally {
//   // Clean up temporary files
//   fs.unlinkSync(svgPath);
//   if (fs.existsSync(wmfPath)) fs.unlinkSync(wmfPath);
// }
// });

/* Trial 
// Handle file upload and conversion
app.post("/convert/latex-to-wmf", async (req, res) => {
  const latexEquation = req.body.latexEquation;
  console.log(" latex equation ", latexEquation);

  if (!latexEquation) {
    return res.status(400).send("No LaTeX equation provided");
  }

  // Save LaTeX equation to a temporary SVG file
  const svgPath = path.join(__dirname, "temp_equation.svg");
  fs.writeFileSync(svgPath, latexEquation);
  let wmfPath = "";
  try {
    // Convert SVG to WMF using canvg and puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(
      '<canvas id="canvas" width="800" height="600"></canvas>'
    );
    const canvas = await page.$("canvas");
    await SVGtoCanvas(canvas, fs.readFileSync(svgPath, "utf-8"));
    const wmfDataUrl = await page.evaluate(() => {
      const canvas = document.getElementById("canvas");
      return canvas.toDataURL("image/wmf");
    });
    const wmfData = Buffer.from(wmfDataUrl.split(",")[1], "base64");
    wmfPath = path.join(__dirname, "converted_equation.wmf");
    fs.writeFileSync(wmfPath, wmfData);
    await browser.close();

    // Send WMF file back to client
    res.set("Content-Type", "image/wmf");
    res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
    res.send(wmfData);
  } catch (error) {
    console.error(`Error converting SVG to WMF: ${error.message}`);
    return res.status(500).send("Internal server error");
  } finally {
    // Clean up temporary files
    fs.unlinkSync(svgPath);
    if (fs.existsSync(wmfPath)) fs.unlinkSync(wmfPath);
  }
});
*/

/* Trial 4
// Handle file upload
app.post("/convert/blob-to-wmf", (req, res) => {
  const latexEquation = req.body.latexEquation;

  if (!latexEquation) {
    return res.status(400).send("No LaTeX equation provided");
  }

  // Save LaTeX equation to a temporary SVG file
  const svgPath = path.join(__dirname, "temp_equation.svg");
  fs.writeFileSync(svgPath, latexEquation);

  // Convert SVG to WMF using ImageMagick
  const wmfPath = path.join(__dirname, "converted_equation.wmf");
  const command = `convert ${svgPath} ${wmfPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting SVG to WMF: ${error.message}`);
      return res.status(500).send("Internal server error");
    }
    if (stderr) {
      console.error(`Conversion warning: ${stderr}`);
    }

    // Read the converted WMF file
    const wmfBuffer = fs.readFileSync(wmfPath);

    // Send WMF file back to client
    res.set("Content-Type", "image/wmf");
    res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
    res.send(wmfBuffer);

    // Delete temporary files
    fs.unlinkSync(svgPath);
    fs.unlinkSync(wmfPath);
  });
});
*/

/* trial 3
// Handle file upload
app.post("/convert/blob-to-wmf", (req, res) => {
  const latexEquation = req.body.latexEquation;

  if (!latexEquation) {
    return res.status(400).send("No LaTeX equation provided");
  }

  // Save LaTeX equation to a temporary SVG file
  const svgPath = path.join(__dirname, "temp_equation.svg");
  fs.writeFileSync(svgPath, latexEquation);

  // Convert SVG to WMF using ImageMagick
  const wmfPath = path.join(__dirname, "converted_equation.wmf");
  const command = `convert ${svgPath} ${wmfPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting SVG to WMF: ${error.message}`);
      return res.status(500).send("Internal server error");
    }
    if (stderr) {
      console.error(`Conversion warning: ${stderr}`);
    }

    // Read the converted WMF file
    const wmfBuffer = fs.readFileSync(wmfPath);

    // Send WMF file back to client
    res.set("Content-Type", "image/wmf");
    res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
    res.send(wmfBuffer);

    // Delete temporary files
    fs.unlinkSync(svgPath);
    fs.unlinkSync(wmfPath);
  });
});
*/

/* trial 2
// Handle file upload
app.post("/convert/blob-to-wmf", (req, res) => {
  console.log(" latex equation is ", req.body);
  const latexEquation = req.body.latexEquation;

  // Render LaTeX equation to SVG using KaTeX (this is just a placeholder)
  const svgData = renderLatexToSvg(latexEquation);

  // Convert SVG to WMF using ImageMagick
  const command = `convert -size 100x100 xc:none -draw "image Over 0,0 0,0 'svg:${svgData}'" output.wmf`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting SVG to WMF: ${error.message}`);
      return res.status(500).send("Internal server error");
    }
    if (stderr) {
      console.error(`Conversion warning: ${stderr}`);
    }

    // Read the converted WMF file
    const wmfBuffer = fs.readFileSync("output.wmf");

    // Send WMF file back to client
    res.set("Content-Type", "image/wmf");
    res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
    res.send(wmfBuffer);
  });
});

*/

/* Trial 1 
// Configure multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// Handle file upload
app.post("/convert/blob-to-wmf", upload.single("file"), (req, res) => {
  console.log("called ", Boolean(req.file), req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Perform conversion
  const inputFilePath = req.file.path;
  const outputFilePath = path.join(__dirname, "converted.wmf");

  const input = fs.readFileSync(inputFilePath);
  const output = wmf.createBuffer(input);

  // Send WMF file back to client
  res.set("Content-Type", "image/wmf");
  res.set("Content-Disposition", 'attachment; filename="converted.wmf"');
  res.send(output);

  // Optionally, clean up temporary files
  fs.unlinkSync(inputFilePath);
});
*/
