# Inertial Altitude Estimation Documentation

This document explains the "temporary" method used to estimate altitude using only the MPU-6050 IMU.

## 1. The Theory: Double Integration
Since the MPU-6050 cannot measure altitude directly, we use the Z-axis accelerometer to track vertical motion.

### The Math
1. **Vertical Acceleration ($a_v$):**
   The sensor measures local acceleration. When level, $1.0g$ is gravity.
   $a_{raw} = acc_z \cdot \cos(roll) \cdot \cos(pitch)$
   $a_v = (a_{raw} - 1.0g) \cdot 9.81$ (Result in $m/s^2$)

2. **Integration to Velocity ($v$):**
   $v_{new} = v_{old} + a_v \cdot \Delta t$

3. **Integration to Position ($h$):**
   $h_{new} = h_{old} + v_{new} \cdot \Delta t$

## 2. Implementation Details
In `sensors.c`, this calculation is performed inside the `sensors_get_attitude` function, which runs at **1kHz** ($dt = 0.001s$).

```c
float cos_roll = cos(g_attitude.roll / RAD_TO_DEG);
float cos_pitch = cos(g_attitude.pitch / RAD_TO_DEG);
float vertical_accel_g = (imu.acc_z * cos_roll * cos_pitch) - 1.0f;
float vertical_accel_ms2 = vertical_accel_g * 9.81f;

g_vertical_velocity += vertical_accel_ms2 * DT;
g_user_altitude += g_vertical_velocity * DT;
```

## 3. Critical Limitations
This is a **temporary estimation** and has several known issues:

### A. Drift (Accumulating Error)
Because we integrate twice, a tiny error in the accelerometer reading (noise) grows quadratically. Even if the drone is stationary, the altitude will slowly "drift" up or down.

### B. Gravity Calibration
The calculation assumes exactly $1.0g$ corresponds to the drone being at rest. If the sensor calibration is off by even $0.05\%$, the altitude will drift significantly.

### C. Centrifugal Forces
During fast turns, centrifugal forces will be interpreted as vertical acceleration, causing the estimated altitude to spike or drop.

## 4. How to Improve
For a production drone, you should:
1. **Add a Barometer:** Use a BMP280 to provide a stable "sea level" reference.
2. **Sensor Fusion:** Use a **Kalman Filter** or **Complementary Filter** to combine the stable Barometer data with the responsive (but drifting) IMU data.
