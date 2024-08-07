## Monitoring Schedule

### Resumen
- Contexto:
  - Coordinar los turnos de guardia para cada servicio monitoreado por semana

- Sistema que permite:
  - Indicar la **disponibilidad de tiempo en la semana** de cada ingeniero del equipo
  - **Asignar a ingenieros a turnos** de monitoreo de servicios.
  - Visualizar los turnos asignados
#### Features
1. Gestión de Turnos: 
  - Facilita la visualización de los turnos asignados 
  - Asegura que la información sobre las horas sin asignar sea clara y accesible.
2. Gestión de Disponibilidad: 
  - Permite a los ingenieros 
    1. Seleccionar el servicio y la semana, 
    2. Visualizar su disponibilidad 
    3. Marcar su disponibilidad.
### Modo de uso:
1. Los ingenieros se reunen para organizar su disponibilidad y turnos
2. Se revisa los turnos indicados por el servicio de empresa para esa semana
3. Se pasa a consultar a cada ingeniero (segun el servicio que le toca esa semana) su disponibilidad para esa semana. Al finalizar se presiona en "Guardar".
4. Se regresa a revisar los turnos asignados automaticamente para la semana segun el servicio.

### Componentes
#### Endpoints - Gestion de Turnos (Shifts)
- 1st Dropdown (Services)
  - GET /api/company_services 
- 2nd Dropdown (Weeks)
  - GET /api/company_services/:id/weeks 
- Engineers Table
  - GET /api/company_services/:id/engineers?week=YYYY-WW 
- Shifts Table
  - GET /api/company_services/:id/shifts?week=YYYY-WW
#### Endpoints - Gestion de Disponibilidad (Availability)
- Dropdowns anteriores (gestion de turnos) para el filtrado y llenado de semana
- Boton Editar Disponibilidad: Consultar Disponibilidad de ingenieros
  - GET /api/company_services/:id/engineers/availability?week=YYYY-WW
- Updates Engineer Availability 
  - POST /api/company_services/:id/engineers/availability
    - week
    - availability (array)
      - engineer_id
      - time_blocks (array)
        - day
        - start_time
        - end_time
        - available


#### Modelos
1. Servicios monitoreados
  - Bloques de 1h
  - Horario establecido (grupo de bloques)
2. Semana
3. Engineer
4. Turno (bloques de 1 hora)
5. Asignacion (Relacion Ingeniero - Hora)

#### Arquitectura Frontend (Grafica Figma)
- View
  - Components
    - provider: useShiftManagement
      - CompanyServiceApi.ts
#### Arquitectura Backend (Grafica Figma)

### Ejecución
#### Ambiente de desarrollo
- Se ha usado Devcontainer y docker-compose para facilitar el desarrollo usando contenedores y vscode
- https://code.visualstudio.com/docs/devcontainers/containers

- Pasos para ejecutar:
  - Tener instalado la extension Devcontainer en vscode
  - Abrir el proyecto en vscode
  - Ejecutar el contenedor Rails API Container:
      - abrir command palette: ctrl + shift + p
      - Seleccionar: Reopen in container
      - Seleccionar: "Rails API Container"
      - Dentro ejecutar: `rails s`
  - Ejecutar el contenedor Vue Container:
      - abrir command palette: ctrl + shift + p
      - Seleccionar: Reopen in container
      - Seleccionar: "Vue Container"
      - Dentro ejecutar: `yarn dev`
  - navegar a 0.0.0.0:8080 para empezar a usar la app
- Ejecutar tests e2e:
  ```bash
  # Conectarse a contenedor de playwright
  docker exec -it monit-playwright /bin/bash
  # ejectuar tests
  yarn test:e2e
  ```


#### Alternativa:
- usar directamente docker-compose up desde la ruta base
```bash
docker-compose -f .devcontainer/docker-compose.yml up
# verificar los servicios
```

- navegar a 0.0.0.0:8080 para empezar a usar la app


### Screenshots
#### Ejecución
![figma-1](./1-shift_management.png)

#### Figma
![figma-1](./shift-availability-management-figma.jpg)
![figma-2](./shift-availability-management-figma-p2.jpg)