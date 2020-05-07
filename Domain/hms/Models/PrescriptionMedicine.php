<?php
namespace Domain\hms\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */

class PrescriptionMedicine {
    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Prescription", inversedBy="prescriptionMedicines")
     * @ORM\JoinColumn(onDelete="cascade")
     */
    private $prescription;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Medicine", inversedBy="prescriptionMedicines")
     * @ORM\JoinColumn(onDelete="cascade")
     */
    private $medicine;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantity;

    /**
     * Get the value of prescription
     */ 
    public function getPrescription()
    {
        return $this->prescription;
    }

    /**
     * Set the value of prescription
     *
     * @return  self
     */ 
    public function setPrescription($prescription)
    {
        $this->prescription = $prescription;

        return $this;
    }

    /**
     * Get the value of medicine
     */ 
    public function getMedicine()
    {
        return $this->medicine;
    }

    /**
     * Set the value of medicine
     *
     * @return  self
     */ 
    public function setMedicine($medicine)
    {
        $this->medicine = $medicine;

        return $this;
    }

    /**
     * Get the value of quantity
     */ 
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * Set the value of quantity
     *
     * @return  self
     */ 
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }
}