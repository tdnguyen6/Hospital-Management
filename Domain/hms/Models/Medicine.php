<?php
namespace Domain\hms\Model;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 */
class Medicine {
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
     * @ORM\Column(length=30)
     */
    private $name;

    /**
     * @ORM\Column(length=30)
     */
    private $origin;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\Column(type="date")
     */
    private $expireDay;

    /**
     * Many Prescriptions Include Many Medicines
     * @ORM\OneToMany(targetEntity="PrescriptionMedicine", mappedBy="medicine")
     */
    private $prescriptionMedicines;

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
     * Get the value of expireDay
     */ 
    public function getExpireDay()
    {
        return $this->expireDay;
    }

    /**
     * Set the value of expireDay
     *
     * @return  self
     */ 
    public function setExpireDay($expireDay)
    {
        $this->expireDay = $expireDay;

        return $this;
    }

    /**
     * Get the value of price
     */ 
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */ 
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of origin
     */ 
    public function getOrigin()
    {
        return $this->origin;
    }

    /**
     * Set the value of origin
     *
     * @return  self
     */ 
    public function setOrigin($origin)
    {
        $this->origin = $origin;

        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

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
}