var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Initial Mock Data
var incidents = [
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
// Selecting Elements
var incidentList = document.querySelector('.incident-list');
var filterSelect = document.getElementById('filter');
var sortSelect = document.getElementById('sort');
var form = document.getElementById('reportForm');
// Utility: Color based on Severity
function getSeverityColor(severity) {
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
function renderIncidents(data) {
    incidentList.innerHTML = '';
    data.forEach(function (incident) {
        var incidentEl = document.createElement('div');
        incidentEl.className = 'incident';
        incidentEl.innerHTML = "\n        <div class=\"incident-header\">\n          <strong>".concat(incident.title, "</strong>\n          <span style=\"background-color: ").concat(getSeverityColor(incident.severity), ";\">").concat(incident.severity, "</span>\n          <small>").concat(new Date(incident.reported_at).toLocaleDateString(), "</small>\n          <button class=\"view-details\">View Details</button>\n        </div>\n        <div class=\"details\">").concat(incident.description, "</div>\n      ");
        var details = incidentEl.querySelector('.details');
        var button = incidentEl.querySelector('.view-details');
        button.addEventListener('click', function () {
            details.classList.toggle('show');
        });
        incidentList.appendChild(incidentEl);
    });
}
// Apply Filter and Sort
function applyFiltersAndSort() {
    var filteredIncidents = __spreadArray([], incidents, true);
    var filter = filterSelect.value;
    if (filter !== 'All') {
        filteredIncidents = filteredIncidents.filter(function (inc) { return inc.severity === filter; });
    }
    var sort = sortSelect.value;
    filteredIncidents.sort(function (a, b) {
        if (sort === 'newest') {
            return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
        }
        else {
            return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
        }
    });
    renderIncidents(filteredIncidents);
}
// Handle Form Submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var titleInput = document.getElementById('title');
    var descriptionInput = document.getElementById('description');
    var severityInput = document.getElementById('severity');
    var title = titleInput.value.trim();
    var description = descriptionInput.value.trim();
    var severity = severityInput.value;
    if (!title || !description || !severity) {
        alert('Please fill in all fields.');
        return;
    }
    var newIncident = {
        id: incidents.length + 1,
        title: title,
        description: description,
        severity: severity,
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
