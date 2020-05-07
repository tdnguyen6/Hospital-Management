<?php
namespace Domain\hms\Model;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Prescription {
    public function __construct() {
        $this->prescriptionMedicines = new ArrayCollection();
    }

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $totalCost;

    /**
     * @ORM\Column(type="integer")
     */
    private $prescribeFor;
    
    /**
     * @ORM\ManyToOne(targetEntity="MedicalStaff", inversedBy="prescribedPrescriptions")
     */
    private $prescribedBy;

    /**
     * Many Prescriptions Include Many Medicines
     * @ORM\OneToMany(targetEntity="PrescriptionMedicine", mappedBy="prescription")
     */
    private $prescriptionMedicines;

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of prescribedBy
     */ 
    public function getPrescribedBy()
    {
        return $this->prescribedBy;
    }

    /**
     * Set the value of prescribedBy
     *
     * @return  self
     */ 
    public function setPrescribedBy($prescribedBy)
    {
        $this->prescribedBy = $prescribedBy;

        return $this;
    }

    /**
     * Get the value of prescribeFor
     */ 
    public function getPrescribeFor()
    {
        return $this->prescribeFor;
    }

    /**
     * Set the value of prescribeFor
     *
     * @return  self
     */ 
    public function setPrescribeFor($prescribeFor)
    {
        $this->prescribeFor = $prescribeFor;

        return $this;
    }

    /**
     * Get many Prescriptions Include Many Medicines
     */ 
    public function getPrescriptionMedicines()
    {
        return $this->prescriptionMedicines;
    }

    /**
     * Set many Prescriptions Include Many Medicines
     *
     * @return  self
     */ 
    public function setPrescriptionMedicines($prescriptionMedicines)
    {
        $this->prescriptionMedicines = $prescriptionMedicines;

        return $this;
    }

    /**
     * Get the value of totalCost
     */ 
    public function getTotalCost()
    {
        return $this->totalCost;
    }

    /**
     * Set the value of totalCost
     *
     * @return  self
     */ 
    public function setTotalCost($totalCost)
    {
        $this->totalCost = $totalCost;

        return $this;
    }
}