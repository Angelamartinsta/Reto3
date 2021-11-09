package minticg25.proyectospring.model.reports;

public class ReservationStatus {
    
    private Integer completed;
    private Integer cancelled;

    public ReservationStatus(Integer completed, Integer cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }
    public Integer getCompleted() {
        return completed;
    }
    public void setCompleted(Integer completed) {
        this.completed = completed;
    }
    public Integer getCancelled() {
        return cancelled;
    }
    public void setCancelled(Integer cancelled) {
        this.cancelled = cancelled;
    }

    

}
