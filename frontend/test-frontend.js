import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Running Frontend Build & Component Validation Tests...\n');

let failed = false;

// 1. Verify build artifacts
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html is missing!');
  failed = true;
} else {
  console.log('✅ dist/index.html verified.');
}

const assetsPath = path.join(distPath, 'assets');
const assetFiles = fs.readdirSync(assetsPath);
const jsBundle = assetFiles.find(f => f.endsWith('.js'));
const cssBundle = assetFiles.find(f => f.endsWith('.css'));

if (!jsBundle || !cssBundle) {
  console.error('❌ Production JS or CSS bundle missing in dist/assets!');
  failed = true;
} else {
  console.log(`✅ Production bundles verified: ${jsBundle}, ${cssBundle}`);
}

// 2. Verify all 11 application components exist
const components = [
  'Navbar.jsx',
  'Sidebar.jsx',
  'Dashboard.jsx',
  'LearnerProfile.jsx',
  'DigitalTwin.jsx',
  'SkillGapAnalyzer.jsx',
  'CareerMatching.jsx',
  'LearningRoadmap.jsx',
  'AssessmentLab.jsx',
  'ProgressAnalytics.jsx',
  'CareerMentor.jsx',
  'AgentCommandCenter.jsx'
];

components.forEach(comp => {
  const p = path.join(__dirname, 'src', 'components', comp);
  if (!fs.existsSync(p)) {
    console.error(`❌ Component ${comp} is missing!`);
    failed = true;
  } else {
    const content = fs.readFileSync(p, 'utf-8');
    if (!content.includes('export default')) {
      console.error(`❌ Component ${comp} does not export default!`);
      failed = true;
    } else {
      console.log(`✅ Component verified: ${comp}`);
    }
  }
});

if (failed) {
  console.error('\n❌ Frontend verification failed.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL FRONTEND VERIFICATION TESTS PASSED!\n');
}
