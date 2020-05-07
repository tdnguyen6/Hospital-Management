<?php
namespace Domain\hms\Model;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Domain\hms\Models\VisitRepo");
 */
class Visit {
    public function __construct()
    {
        $this->checkIn = new DateTime();
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
     * @ORM\Column(length=4)
     */
    private $payMethod;

    /**
     * @ORM\Column(type="boolean")
     */
    private $paid;

    /**
     * @ORM\Column(type="datetime")
     */
    private $checkIn;

    /**
     * @ORM\Column(type="datetime")
     */
    private $checkOut;

    /**
     * @ORM\ManyToOne(targetEntity="Patient", inversedBy="visits")
     */
    private $byPatient;

    /**
     * @ORM\ManyToOne(targetEntity="MedicalService", inversedBy="visits")
     */
    private $requestedService;

    /**
     * @ORM\OneToOne(targetEntity="Prescription")
     */
    private $prescription;

    /**
     * Get the value of byPatient
     */ 
    public function getByPatient()
    {
        return $this->byPatient;
    }

    /**
     * Set the value of byPatient
     *
     * @return  self
     */ 
    public function setByPatient($byPatient)
    {
        $this->byPatient = $byPatient;

        return $this;
    }

    /**
     * Get the value of checkIn
     */ 
    public function getCheckIn()
    {
        return $this->checkIn;
    }

    /**
     * Set the value of checkIn
     *
     * @return  self
     */ 
    public function setCheckIn($checkIn)
    {
        $this->checkIn = $checkIn;

        return $this;
    }

    /**
     * Get the value of checkOut
     */ 
    public function getCheckOut()
    {
        return $this->checkOut;
    }

    /**
     * Set the value of checkOut
     *
     * @return  self
     */ 
    public function setCheckOut($checkOut)
    {
        $this->checkOut = $checkOut;

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

    /**
     * Get the value of paid
     */ 
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set the value of paid
     *
     * @return  self
     */ 
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get the value of payMethod
     */ 
    public function getPayMethod()
    {
        return $this->payMethod;
    }

    /**
     * Set the value of payMethod
     *
     * @return  self
     */ 
    public function setPayMethod($payMethod)
    {
        $this->payMethod = $payMethod;

        return $this;
    }

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
     * Get the value of requestedService
     */ 
    public function getRequestedService()
    {
        return $this->requestedService;
    }

    /**
     * Set the value of requestedService
     *
     * @return  self
     */ 
    public function setRequestedService($requestedService)
    {
        $this->requestedService = $requestedService;

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