const fs = require('fs-extra');
const path = require('path');

// Copy frontend build to backend for serving
const sourceDir = path.join(__dirname, '../frontend/build');
const destDir = path.join(__dirname, 'build');

async function copyBuild() {
  try {
    if (await fs.pathExists(sourceDir)) {
      await fs.copy(sourceDir, destDir);
      console.log('Frontend build copied to backend successfully');
    } else {
      console.log('Frontend build directory not found, skipping copy');
    }
  } catch (error) {
    console.error('Error copying frontend build:', error);
  }
}

copyBuild();
