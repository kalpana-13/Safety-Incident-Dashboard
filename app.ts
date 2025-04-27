interface Incident {
    id: number;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    reported_at: string;
  }
  

  let incidents: Incident[] = [
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description: "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
    },
  ];
  

  const incidentList = document.querySelector('.incident-list') as HTMLDivElement;
  const filterSelect = document.getElementById('filter') as HTMLSelectElement;
  const sortSelect = document.getElementById('sort') as HTMLSelectElement;
  const form = document.getElementById('reportForm') as HTMLFormElement;
  
  // Utility: Color based on Severity
  function getSeverityColor(severity: string): string {
    switch (severity) {
      case 'High':
        return '#e74c3c';
      case 'Medium':
        return '#f39c12';
      case 'Low':
        return '#27ae60';
      default:
        return '#3498db';
    }
  }
  
  // Render Incidents
  function renderIncidents(data: Incident[]): void {
    incidentList.innerHTML = '';
  
    data.forEach((incident) => {
      const incidentEl = document.createElement('div');
      incidentEl.className = 'incident';
      incidentEl.innerHTML = `
        <div class="incident-header">
          <strong>${incident.title}</strong>
          <span style="background-color: ${getSeverityColor(incident.severity)};">${incident.severity}</span>
          <small>${new Date(incident.reported_at).toLocaleDateString()}</small>
          <button class="view-details">View Details</button>
        </div>
        <div class="details">${incident.description}</div>
      `;
  
      const details = incidentEl.querySelector('.details') as HTMLDivElement;
      const button = incidentEl.querySelector('.view-details') as HTMLButtonElement;
      
      button.addEventListener('click', () => {
        details.classList.toggle('show');
      });
  
      incidentList.appendChild(incidentEl);
    });
  }
  
  // Apply Filter and Sort
  function applyFiltersAndSort(): void {
    let filteredIncidents = [...incidents];
  
    const filter = filterSelect.value;
    if (filter !== 'All') {
      filteredIncidents = filteredIncidents.filter((inc) => inc.severity === filter);
    }
  
    const sort = sortSelect.value;
    filteredIncidents.sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
      } else {
        return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
      }
    });
  
    renderIncidents(filteredIncidents);
  }
  
  // Handle Form Submission
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
  
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const severityInput = document.getElementById('severity') as HTMLSelectElement;
  
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const severity = severityInput.value;
  
    if (!title || !description || !severity) {
      alert('Please fill in all fields.');
      return;
    }
  
    const newIncident: Incident = {
      id: incidents.length + 1,
      title: title,
      description: description,
      severity: severity as 'Low' | 'Medium' | 'High',
      reported_at: new Date().toISOString(),
    };
  
    incidents.push(newIncident);
  
    form.reset();
    applyFiltersAndSort();
  });
  
  // Event Listeners
  filterSelect.addEventListener('change', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  
  // Initial Render
  renderIncidents(incidents);
  