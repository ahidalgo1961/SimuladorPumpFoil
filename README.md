# Wing Foil Simulator v23h9

An interactive web application that simulates the physics and dynamics of wing foiling, a water sport combining a board with hydrofoil and a hand-held inflatable wing. The simulator models in real-time the aerodynamic, hydrodynamic, and biomechanical forces involved in this sport.

## 🆕 **Latest Features v23h9**

### **New KPIs - Table Position Tracking**
- **X_table (m)**: Horizontal position of the table's geometric center in global reference frame
- **Y_table (m)**: Vertical position (height) of the table's geometric center in global reference frame
- **Z_table (m)**: Depth position of the table's geometric center in global reference frame
- **Real-time monitoring** of table coordinates during simulation

### **Enhanced User Interface**
- **Auto-Center Table Button**: "📍 Center Table" button for automatic table positioning
- **Global Zoom Controls**: "+" and "−" buttons for comprehensive zoom affecting all visual elements
- **Component Weight Vectors**: Individual weight vectors for board, foil, and tail at their geometric centers
- **Dynamic Scaling**: Optimized vertical (300 px/m) and horizontal (80 px/m) scales
- **Improved Debugging**: Console logging for position diagnostics

### **Physics & Visualization**
- **ODE Physics Mode**: Rigid body dynamics with RK4 integration
- **Coupled Forces**: Aerodynamic, hydrodynamic, and buoyancy forces fully integrated
- **Interactive Tooltips**: Hover over vectors for detailed information
- **Angle φ Visualization**: Complete reference system with geometric center alignment
- **Dynamic Limit Control**: Flexible slider ranges with automatic adaptation

## 🚀 **Quick Start**

### Prerequisites
- **Node.js** (version 14 or higher)
- Modern web browser with SVG support

### Installation
```bash
# Clone or download the repository
git clone https://github.com/ahidalgo1961/SimuladorPumpFoil.git
cd SimuladorPumpFoil

# Install dependencies
npm install
```

### Running the Application
```bash
# Option 1: Using npm
npm start

# Option 2: Direct execution
node server.js

# Option 3: Open directly in browser
# Open index.html in your web browser
```

### Access the Application
Once the server is running, open your browser and navigate to:
```
http://localhost:3001
```

## 🎯 **Key Features**

### **Real-Time Physics Simulation**
- **6-DOF Rigid Body Dynamics**: Position (x,z), velocity (u,w), orientation (θ), angular velocity (q)
- **RK4 Integration**: High-precision numerical integration for accurate dynamics
- **Coupled Force System**: Aerodynamic lift/drag, hydrodynamic forces, buoyancy, rider forces

### **Interactive Visualization**
- **SVG-Based Graphics**: Scalable vector graphics for crisp visualization
- **Real-Time Updates**: All parameters update simultaneously during simulation
- **Component Weight Visualization**: Individual weight vectors at geometric centers (brown=board, blue=foil, green=tail)
- **Pan & Zoom Controls**: Navigate and scale the visualization area
  - **Zoom In/Out Buttons**: "+" and "−" buttons for comprehensive scaling
  - **Global Scaling**: Zoom affects all visual elements proportionally (geometry, vectors, forces)
  - **Scale Factors**: Horizontal scale (80 px/m), Vertical scale (300 px/m)
  - **Vector Scaling**: Velocity and force vectors scale with zoom (velscale, fuerzascale)
  - **Zoom Range**: Flexible scaling with automatic adaptation to content
- **Multiple View Modes**: Show/hide different force vectors and reference frames

### **Comprehensive KPIs**
- **Aerodynamic**: Angle of attack (α), lift (L), drag (D), lift-to-drag ratio (L/D)
- **Hydrodynamic**: Thrust, vertical forces, buoyancy
- **Geometric**: Table position (X,Y,Z), center of pressure height (h_CoP)
- **Performance**: Support percentage, rider moment, table speed
- **Physical**: Draft, immersed volume, effective angle (θ_eff)

### **Control Systems**
- **Dynamic Sliders**: Real-time parameter adjustment with flexible ranges
- **Rider Model**: Front/rear foot forces with configurable distribution
- **Wing Control**: Incidence angle, area, lift curve slope, stall characteristics
- **Foil System**: Main foil and tail with geometric parameters

## 📊 **Coordinate System**

The simulator uses a right-handed coordinate system:
- **X**: Horizontal position (positive to the right)
- **Y**: Vertical position/height (positive upward from water surface)
- **Z**: Depth position (positive forward, currently set to 0 for table)

### **Reference Points**
- **W(0,0)**: Global fixed world reference
- **B(0,0)**: Stern reference point (solidary with board)
- **Table Center**: Geometric center of the board for position tracking
- **Center of Pressure**: Aerodynamic center for force calculations

## 🛠 **Technical Architecture**

### **Core Files**
- `index.html`: Main user interface with controls and visualization
- `sim.js`: Physics engine, visualization, and user interaction logic
- `server.js`: Local development server
- `package.json`: Node.js dependencies and scripts

### **Physics Model**
- **Wing Aerodynamics**: 2D lift/drag model with stall characteristics
- **Foil Hydrodynamics**: Simplified pressure distribution
- **Buoyancy**: Archimedes principle with immersed volume calculation
- **Rider Biomechanics**: Force distribution between front/rear feet

### **Visualization System**
- **SVG Rendering**: Vector-based graphics with interactive elements
- **Real-Time Updates**: 60 FPS simulation with synchronized display
- **Scalable Interface**: Responsive design adapting to different screen sizes

## 📈 **Usage Guide**

### **Basic Operation**
1. **Start the Server**: Run `npm start` or `node server.js`
2. **Open Browser**: Navigate to `http://localhost:3001`
3. **Adjust Parameters**: Use sliders to modify wing, foil, and rider parameters
4. **Run Simulation**: Click play button to start real-time simulation
5. **Monitor KPIs**: Watch key performance indicators update in real-time
6. **Analyze Results**: Use historical charts to analyze trends over time

### **Advanced Features**
- **Parameter Exploration**: Use dynamic limits to explore wide parameter ranges
- **Force Analysis**: Enable/disable different force vectors for detailed analysis
- **Position Tracking**: Monitor table coordinates with new X,Y,Z KPIs
- **Debug Mode**: Check console for detailed position and force calculations

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### **Development Setup**
```bash
# Install development dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build
```

## 📄 **License**

This project is open source. Please check the license file for details.

## 📞 **Contact**

For questions, suggestions, or support:
- **Repository**: [GitHub](https://github.com/ahidalgo1961/SimuladorPumpFoil)
- **Issues**: Use GitHub Issues for bug reports and feature requests

---

**Version**: v23h9
**Last Updated**: August 31, 2025